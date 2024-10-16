import {
  UserContextActionsInterface,
  UserContextStateInterface
} from './context.interface'

export const INITIAL_STATE_USER_CONTEXT: UserContextStateInterface = {
  loggedUser: null,
  registeredUsers: []
}

export const INITIAL_STATE_USER_CONTEXT_ACTIONS: UserContextActionsInterface = {
  removeUser: () => null,
  setUser: () => null,
  setLoggedUser: () => null,
  removeLoggedUser: () => null
}
