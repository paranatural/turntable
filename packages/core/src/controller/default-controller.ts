import { nanoid } from 'nanoid'

import { Plugin } from '../plugin'
import { Route } from '../route'
import { ControllerOptions, Controller } from './controller'

export class DefaultController<P extends Array<Plugin> = []> implements Controller<P> {
  private readonly options: ControllerOptions<P> = {}
  private readonly routes: Array<Route<P>> = []
  private readonly plugins: Array<Plugin> = []

  private state = {
    currentRoute: Route
  }

  private subscriptions: Record<string, (route: Route) => void> = {}

  public constructor(
    options: ControllerOptions<P>,
    routes: Array<Route<P>> = [],
    plugins?: P,
  ) {
    this.options = options
    this.routes = routes
    this.plugins = plugins || this.plugins
  };

  public match (url: string): Route<P> | null {
    const {
      pathname,
      search,
      hash
    } = new URL(url, 'https://localhost/')

    let routeList: Array<Route<P>> = this.routes
    let routeResult = null
    while (routeList && routeList.length > 0) {
      for (let route of routeList) {
        if (route.match(pathname)) {
          routeResult = route
          routeList = route.options.nested || []
          break
        }
      }
    }

    return routeResult
  };

  public start (): void {};

  public subscribe (): string {
    return nanoid()
  };

  public navigate (): void {
    const {
      pathname,
      search,
      hash
    } = window.location

    this.routes.forEach(route => {
      route.match(pathname)
    })
  };

  public unsubscribe (): void {};

  public stop (): void {};
}
