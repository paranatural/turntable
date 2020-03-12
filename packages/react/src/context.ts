import { Context, createContext } from 'react'

import { Ghostship } from '@ghostship/core'

export type GhostshipContext = Ghostship | null

export const ghostshipContext: Context<GhostshipContext> = createContext(null as GhostshipContext)
