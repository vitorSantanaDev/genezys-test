export interface UserContextProviderProps {
  children: React.ReactNode
}

export interface UserStateInterface {
  name: string
  email: string
  password: string
}

export type UserContextStateInterface = {
  loggedUser?: UserStateInterface | null
  registeredUsers?: UserStateInterface[]
}

export interface UserContextActionsInterface {
  setLoggedUser: (user: UserStateInterface) => void
  setUser: (user: UserStateInterface) => void
  removeUser: (user: UserStateInterface) => void
  removeLoggedUser: () => void
  getLoggedUserFromLocalStorage?: () => Promise<void>
}
