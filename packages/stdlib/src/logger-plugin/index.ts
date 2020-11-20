import { Plugin } from '../core'

/**
 * Simply traces all events in Controller
 * */
export const loggerPlugin: Plugin<{}, {
  logStream?: (message: string, level: string) => void;
}> = {

}
