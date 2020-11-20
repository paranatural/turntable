import { Controller } from '../controller'

export type Plugin<RouteOptions = {}, ControllerOptions = {}> = {
  routeOptions?: RouteOptions;
  controllerOptions?: ControllerOptions;
  onStart?: () => void;
  onMatchAttempt?: () => void;
  onMatchFailed?: () => void;
  onMatchSucceed?: () => void;
  onFinish?: () => void;
}
