import { uriBuild, uriParse } from './uri-tools'

type Route = {
  path: string
  nested?: Route[]
  middlewares?: Middleware[]
}

type HistoryState = {
  path?: string
  query?: string
  hash?: string
}

type StrictHistoryState = {
  path: string
  query: string
  hash: string
}

export type Middleware = (delta: HistoryState) => boolean

type Subscription = (
  prevState: StrictHistoryState,
  stateDelta: HistoryState,
  nextState: StrictHistoryState
) => void

type Options = {
  trailingSlash?: boolean
  parse?: (state: string) => HistoryState
  stringify?: (state: HistoryState) => string
  match?: (template: string, path: string) => boolean
}

const defaultOptions: Options = {
  trailingSlash: false,
  parse: state => {
    const uriResults = uriParse(state)
    return {
      path: uriResults.path,
      query: uriResults.query,
      hash: uriResults.fragment
    }
  },
  stringify: state => uriBuild({
    path: state.path,
    query: state.query,
    fragment: state.hash
  })
}

export class Ghostship {
  private routes: Route[] = []
  private options: Options = {}
  private middlewares: Middleware[] = []
  private isWorking: boolean = false
  private subscriptions: Subscription[] = []
  private currentHistoryState: StrictHistoryState

  constructor (routes: Route[], options: Options, middlewares: Middleware[]) {
    this.routes = routes
    this.options = Object.assign({}, defaultOptions, options)
    this.middlewares = middlewares || []
    this.subscriptions = []
    this.currentHistoryState = {
      hash: window.location.hash,
      query: window.location.search,
      path: window.location.pathname
    }
  }

  public start = () => {
    const methods: Array<keyof History> = ['pushState', 'replaceState']

    const originals = {}
    methods.forEach(method => {
      const original = window.history[method]
      // @ts-ignore
      originals[method] = window.history[method]
      // @ts-ignore
      window.history[method] = (...args) => {
        this.historyListener(...args)
        original(...args)
      }
    })

    return () => {
      methods.forEach(method => {
        // @ts-ignore
        window.history[method] = originals[method]
      })
    }
  }

  private normalizeHistoryState = (state: HistoryState | string): StrictHistoryState => {
    if (typeof state === 'string') {
      // @ts-ignore
      state = this.options.parse(state)
    }
    return {
      path: state.path || this.currentHistoryState.path,
      query: state.query || this.currentHistoryState.query,
      hash: state.hash || this.currentHistoryState.hash
    }
  }

  private findDelta = (oldState: StrictHistoryState, newState: StrictHistoryState): HistoryState => {
    const delta = {}
    Object.keys(oldState).forEach(key => {
      // @ts-ignore
      if (oldState[key] !== newState[key]) delta[key] = newState[key]
    })
    return delta
  }

  private match = (template: string, path: string) => {
    return template === path
  }

  public navigate = (newState: HistoryState | string) => {
    const delta = this.findDelta(
      this.currentHistoryState,
      this.normalizeHistoryState(newState)
    )

    if (!delta.path && !delta.query && !delta.hash) return

    for (const { middlewares, path } of this.routes) {
      // @ts-ignore
      if (this.match(path, delta.path)) {
        // @ts-ignore
        for (const middleware of middlewares) {
          if (!middleware(delta)) return
        }
      }
    }

    const newHistoryState = Object.assign({}, this.currentHistoryState, delta)
    // @ts-ignore
    window.history.pushState({}, '', this.options.stringify(newHistoryState))
    this.currentHistoryState = newHistoryState
  }

  private historyListener = (
    data: any = {},
    title: string = '',
    url?: string
  ): boolean => {
    return true
  }

  // @ts-ignore
  public subscribe = (handler) => {
    this.subscriptions.push(handler)
    return () => {
      this.subscriptions.splice(this.subscriptions.indexOf(handler), 1)
    }
  }

  public stop = () => {
    this.isWorking = false
  }
}
