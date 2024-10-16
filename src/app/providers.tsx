import { PropsWithChildren } from 'react'
import { UserContextProvider } from './context/user/user-context-provider'

export function Providers({ children }: PropsWithChildren) {
  return <UserContextProvider>{children}</UserContextProvider>
}
