'use client'

import { useContext } from 'react'
import { UserContext } from './user-context-provider'

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (typeof context === 'undefined') {
    throw new Error(
      'You have to use useUserContext inside <UserContextProvider />'
    )
  }
  return { ...context }
}
