import { Plugin } from '../../core'

import { Serializer } from './serializer'

export const browserPlugin: Plugin<{
  strictSlash?: boolean;
  fixSlash?: boolean;
  strictQuery?: boolean;
  fixQuery?: boolean;
  strictHash?: boolean;
  fixHash?: boolean;
}, {
  serializer: Serializer,
}> = {
  routeOptions: {
    strictSlash: false,
    fixSlash: false,
    strictQuery: false,
    fixQuery: false,
    strictHash: false,
    fixHash: false
  }
}
