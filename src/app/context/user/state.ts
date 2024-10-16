import { User } from '@/app/interfaces/user.interface'

export interface UserContextState {
  user: User | null
}

export const INITIAL_STATE_USER_CONTEXT: UserContextState = {
  user: null
}

export interface UserContextActions {
  setUser: (user: User) => void
  removeUser: () => void
}

export const INITIAL_STATE_USER_CONTEXT_ACTIONS: UserContextActions = {
  removeUser: () => null,
  setUser: () => null
}
