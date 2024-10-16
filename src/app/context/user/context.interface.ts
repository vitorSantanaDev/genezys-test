export interface UserContextProviderProps {
  children: React.ReactNode
}

export type UserContextStateInterface = {
  user: {
    email: string
    name: string
    password: string
  } | null
}

export interface UserContextActionsInterface {
  setUser: (user: UserContextStateInterface) => void
  removeUser: () => void
}
