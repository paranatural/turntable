import { Plugin } from '../plugin'

export type RouteOptions<P extends Array<Plugin> = []> = {
  path: string;
  strict?: boolean;
  nested?: Array<Route<P>>;
} & P[number]['routeOptions']

export class Route<P extends Array<Plugin> = []> {
  public options: RouteOptions<P>

  public constructor(options: RouteOptions<P>) {
    this.options = {
      strict: true,
      nested: [],
      ...options
    }
  }

  /**
   * Returns null if there is no match or
   * matches part of string and returns the rest
   * */
  match(pathSegment: string): null | string {
    if (pathSegment.startsWith(this.options.path)) {
      return pathSegment.substring(this.options.path.length)
    }
    return null
  }
}
