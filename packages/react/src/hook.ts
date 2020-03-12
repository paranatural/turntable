import { useContext } from 'react'
import { GhostshipContext, ghostshipContext } from './context'

export const useGhostship = (): GhostshipContext => useContext(ghostshipContext)
