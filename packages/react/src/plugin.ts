import { ComponentType } from 'react'

import { Plugin } from '../core'

export const reactPlugin: Plugin<{
  component: ComponentType,
}> = {}
