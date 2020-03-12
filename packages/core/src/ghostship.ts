import { uriBuild, uriParse } from './uri-tools'

export interface Route {
  path: string
  nested?: Route
  middlewares?: Middleware[],
}

export interface HistoryState {
  path?: string
  query?: string
  hash?: string
}

export type Middleware = (
  prevState: HistoryState,
  stateDelta: HistoryState,
  nextState: HistoryState
) => HistoryState | boolean

export interface Options {
  trailingSlash?: boolean
  parse?: (state: string) => HistoryState
  stringify?: (state: HistoryState) => string
  match?: (template: string, path: string) => boolean
}

interface StrictOptions {
  trailingSlash: boolean
  parse: (state: string) => HistoryState
  stringify: (state: HistoryState) => string
  match: (template: string, path: string) => boolean
}

const defaultOptions: StrictOptions = {
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
  }),
  match: (template, path) => (template === path)
}

export class Ghostship {
  private routes: Route[]
  private options: StrictOptions
  private middlewares: Middleware[]
  private currentHistoryState: HistoryState

  constructor (routes: Route[], options: Options, middlewares: Middleware[]) {
    this.routes = routes
    this.options = Object.assign({}, defaultOptions, options)
    this.middlewares = middlewares || []
    this.currentHistoryState = {}
  }

  public findDelta = (
    oldState: HistoryState,
    newState: HistoryState
  ): HistoryState => {
    const delta: HistoryState = {}
    if (oldState.path !== newState.path) delta.path = newState.path
    if (oldState.query !== newState.query) delta.query = newState.query
    if (oldState.hash !== newState.hash) delta.hash = newState.hash
    return delta
  }

  public navigate = (newState: HistoryState | string) => {
    const nextState = typeof newState === 'string'
      ? this.options.parse(newState)
      : newState

    const delta = this.findDelta(
      this.currentHistoryState,
      nextState
    )

    if (!delta.path && !delta.query && !delta.hash) return

    for (const { middlewares, path } of this.routes) {
      if (delta.path && middlewares && this.options.match(path, delta.path)) {
        for (const middleware of middlewares) {
          if (!middleware(this.currentHistoryState, delta, nextState)) return
        }
      }
    }

    if (delta.path && this.middlewares) {
      for (const middleware of this.middlewares) {
        if (!middleware(this.currentHistoryState, delta, nextState)) return
      }
    }

    const newHistoryState = Object.assign({}, this.currentHistoryState, delta)
    window.history.pushState({}, '', this.options.stringify(newHistoryState))
    this.currentHistoryState = newHistoryState
  }

  public subscribe = (handler: Middleware) => {
    this.middlewares.push(handler)
    return () => {
      this.middlewares.splice(this.middlewares.indexOf(handler), 1)
    }
  }
}
