import { Plugin } from '../core'

/**
 * Redirects to some route if query/hash fails contract requirements
 * */
export const contractsPlugin: Plugin<{
  contract?: () => boolean;
}> = {

}
