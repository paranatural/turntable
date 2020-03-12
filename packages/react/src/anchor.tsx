import React, {
  AnchorHTMLAttributes,
  FunctionComponent,
  useMemo,
} from 'react'
import { useGhostship } from './hook'

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const Anchor: FunctionComponent<AnchorProps> = ({
  href,
  ...props
}) => {
  const Ghostship = useGhostship()

  // TODO: route equality method
  const isCurrent = useMemo(() => {
    return true
  }, [Ghostship])

  // TODO: library-free absolute/relative url detecting method
  const isAbsolute = useMemo(() => {
    if (href !== undefined) return true
  }, [href])

  return (
    <a href={href} {...props} />
  )
}
