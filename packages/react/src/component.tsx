import React, { FunctionComponent } from 'react'
// @ts-ignore
import { Ghostship } from '@ghostship/core'
import { ghostshipContext } from './context'

export interface GhostshipComponentProps {
  instance: Ghostship;
}

export const GhostshipComponent: FunctionComponent<GhostshipComponentProps> = ({
  children,
  instance
}) => {
  return (
    <ghostshipContext.Provider value={instance}>
      {children}
    </ghostshipContext.Provider>
  )
}
