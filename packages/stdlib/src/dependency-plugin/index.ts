import { Plugin } from '../core'

/**
 * Prevents route loading until async dependency loads
 * */
export const dependencyPlugin: Plugin<{
  dependency?: () => Promise<any>;
}> = {

}
