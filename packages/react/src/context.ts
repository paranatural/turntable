import { Context, createContext } from 'react'
// @ts-ignore
import { Ghostship } from '@ghostship/core'

export type GhostshipContext = Ghostship

// @ts-ignore
export const ghostshipContext: Context<GhostshipContext> = createContext(null)
