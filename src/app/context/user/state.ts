import { USERS_MOCK } from '@/mock/users'
import {
  UserContextActionsInterface,
  UserContextStateInterface
} from './context.interface'

export const INITIAL_STATE_USER_CONTEXT: UserContextStateInterface = {
  loggedUser: null,
  registeredUsers: USERS_MOCK.map((user) => ({
    password: '',
    name: user.name,
    email: user.email
  }))
}

export const INITIAL_STATE_USER_CONTEXT_ACTIONS: UserContextActionsInterface = {
  removeUser: () => null,
  setUser: () => null,
  setLoggedUser: () => null,
  removeLoggedUser: () => null
}
