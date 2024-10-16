import {
  UserContextActionsInterface,
  UserContextStateInterface
} from './context.interface'

export const INITIAL_STATE_USER_CONTEXT: UserContextStateInterface = {
  user: null
}

export const INITIAL_STATE_USER_CONTEXT_ACTIONS: UserContextActionsInterface = {
  removeUser: () => null,
  setUser: () => null
}
