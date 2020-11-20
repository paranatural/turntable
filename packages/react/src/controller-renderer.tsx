import React, {
  ComponentType,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'

import { Controller } from '../core'

export type ControllerRendererProps = {
  controller: Controller,
}
/**
 * React component which used to subscribe on Controller and render current route component.
 * Requires reactPlugin to be installed in Controller
 * */
export const ControllerRenderer: FunctionComponent<ControllerRendererProps> = ({
  controller
}) => {
  const [CurrentComponent, setCurrentComponent] = useState<ComponentType>()
  const subscribeHandler = useCallback(() => {

  }, [])

  useEffect(() => {
    const subscriptionId = controller.subscribe(subscribeHandler)
    return controller.unsubscribe(subscriptionId)
  }, [controller])

  return (
    CurrentComponent
      ? <CurrentComponent/>
      : null
  )
}
