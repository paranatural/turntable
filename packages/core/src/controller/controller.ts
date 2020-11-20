import { Plugin } from '../plugin'
import { Route } from '../route'
import { Serializer } from '../../stdlib/browser-plugin/serializer'

export type ControllerOptions<P extends Array<Plugin> = []> = {
  serializer?: Serializer;
} & P[number]['controllerOptions']

export abstract class Controller<P extends Array<Plugin> = []> {
  protected constructor(
    options: ControllerOptions<P>,
    routes: Array<Route<P>> = [],
    plugins?: P,
  ) {}
  abstract match: (url: string) => Route<P> | null;
  abstract start: () => void;
  abstract subscribe: (handler: (route: Route<P>) => void) => string;
  abstract navigate: (to: Route<P> | string) => void;
  abstract unsubscribe: (subscriptionId: string) => void;
  abstract stop: () => void;
}
