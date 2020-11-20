import { Plugin } from '../core'

/**
 * Caches route matching result to inner hashmap
 * */
export const cachePlugin: Plugin<{
  cache: boolean;
}> = {}
