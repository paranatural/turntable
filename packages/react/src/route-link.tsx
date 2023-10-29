import React, { ComponentProps, FunctionComponent } from 'react'

import { Route } from '../core'

export interface RouteLinkProps extends ComponentProps<'a'> {
  to?: Route | string
}

export const RouteLink: FunctionComponent<RouteLinkProps> = ({
  ...props
}) =>
  <a {...props} />
