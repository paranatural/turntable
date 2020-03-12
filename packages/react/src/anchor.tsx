import React, {
  AnchorHTMLAttributes,
  FunctionComponent,
  useMemo,
  useContext,
  useEffect
} from 'react'
import { ghostshipContext } from './context'

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const Anchor: FunctionComponent<AnchorProps> = ({
  href,
  ...props
}) => {
  const Ghostship = useContext(ghostshipContext)
  useEffect(() => {
    const unsubscribe = Ghostship.subscribe(() => {
      console.log('action')
    })
    return () => unsubscribe()
  }, [Ghostship])

  // todo: route equality method
  const isCurrent = useMemo(() => {
    return true
  }, [Ghostship])

  // todo: library-free absolute/relative url detecting method
  const isAbsolute = useMemo(() => {
    if (href !== undefined) return true
  }, [href])

  return (
    <a href={href} {...props} />
  )
}
