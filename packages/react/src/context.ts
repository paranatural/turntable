import { Context, createContext } from 'react'

import { Ghostship } from '@ghostship/core'

export type GhostshipContext = Ghostship

export const ghostshipContext: Context<GhostshipContext> = createContext(null)
