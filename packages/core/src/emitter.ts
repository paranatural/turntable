export type ActionId = string
export type ActionPayload = any

export type Action<StateType> = (
  statePrev: StateType,
  payload: ActionPayload
) => StateType | undefined

export type Watcher<StateType> = (stateNew: StateType) => void

export type Emitter<StateType> = {
  on: (eventName: ActionId, action: Action<StateType>) => void;
  watch: (watcher: Watcher<StateType>) => void;
  emit: (actionID: ActionId, payload: ActionPayload) => void;
  getState: () => StateType;
  clearActions: () => void;
  clearWatchers: () => void;
}

export const createEmitter = <StateType>(initialState: StateType): Emitter<StateType> => {
  let stateCurrent: StateType = initialState
  let actionsMap: Record<ActionId, Array<Action<StateType>>> = {}
  let watchersList: Array<Watcher<StateType>> = []

  return {
    on: (actionKey: ActionId, action: Action<StateType>): void => {
      if (actionsMap[actionKey]) {
        actionsMap[actionKey].push(action)
      } else {
        actionsMap[actionKey] = [action]
      }
    },
    watch: (watcher): void => {
      watchersList.push(watcher)
    },
    emit: (actionId: ActionId, payload: ActionPayload) => {
      let stateNew: StateType = stateCurrent
      let error = undefined

      if (actionsMap[actionId]) {
        actionsMap[actionId].forEach(action => {
          try {
            const actionResult = action(stateCurrent, payload)
            if (actionResult) {
              stateNew = actionResult
            }
          } catch (e) {
             error = e
          }
        })
      }

      watchersList.forEach(watcher => {
        try {
          watcher(stateNew)
        } catch (e) {
          return undefined;
        }
      })

      stateCurrent = stateNew

      if (error) {
        throw error
      }
    },
    getState: (): StateType => {
      return stateCurrent
    },
    clearActions: (): void => {
      actionsMap = {}
    },
    clearWatchers: (): void => {
      watchersList = []
    }
  }
}
