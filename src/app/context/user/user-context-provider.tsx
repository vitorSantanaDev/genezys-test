'use client'

import { reducer } from './reducer'
import { buildActions } from './build-actions'
import { createContext, useEffect, useReducer, useRef } from 'react'
import {
  INITIAL_STATE_USER_CONTEXT,
  INITIAL_STATE_USER_CONTEXT_ACTIONS
} from './state'

import {
  UserContextProviderProps,
  UserContextStateInterface,
  UserContextActionsInterface
} from './context.interface'

export const UserContext = createContext<{
  state: UserContextStateInterface
  actions: UserContextActionsInterface
}>({
  state: INITIAL_STATE_USER_CONTEXT,
  actions: INITIAL_STATE_USER_CONTEXT_ACTIONS
})

export const LOCAL_STORAGE_KEY = '@usersSession'

export type LocalStorageDataInterface = Omit<
  UserContextStateInterface,
  'loadingState'
>

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_USER_CONTEXT)

  const actions = useRef(buildActions(dispatch))

  function saveUserToLocalStorage() {
    const localStorageDataSerialized = localStorage.getItem(LOCAL_STORAGE_KEY)

    let existingData: LocalStorageDataInterface = {
      loggedUser: state.loggedUser,
      registeredUsers: state.registeredUsers
    }

    if (localStorageDataSerialized) {
      existingData = JSON.parse(localStorageDataSerialized)
    }

    const updatedData: LocalStorageDataInterface = {
      ...existingData
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
  }

  async function getLoggedUserFromLocalStorage() {
    const localStorageDataSerialized = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!localStorageDataSerialized) return

    const parsedData: LocalStorageDataInterface = JSON.parse(
      localStorageDataSerialized
    )

    if (parsedData.loggedUser) {
      const { loggedUser } = parsedData
      actions.current.setLoggedUser(loggedUser)
    }
  }

  useEffect(() => {
    if (!state.loggedUser && !state.registeredUsers?.length) return
    saveUserToLocalStorage()
  }, [state.registeredUsers?.length, state.loggedUser])

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { ...actions.current, getLoggedUserFromLocalStorage }
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
