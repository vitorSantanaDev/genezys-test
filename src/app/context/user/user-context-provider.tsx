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

  async function saveUserToLocalStorage() {
    const data: LocalStorageDataInterface = {
      loggedUser: state.loggedUser,
      registeredUsers: state.registeredUsers
    }

    await updateLocalStorage(data)
  }

  async function getLoggedUserFromLocalStorage() {
    const existingData = await getExistingDataFromLocalStorage()

    if (!existingData) return

    if (existingData.loggedUser) {
      const { loggedUser } = existingData
      actions.current.setLoggedUser(loggedUser)
    }
  }

  async function removeLoggedUserFromLocalStorage() {
    actions.current.removeLoggedUser()

    const dataUpdated: LocalStorageDataInterface = {
      loggedUser: null,
      registeredUsers: []
    }

    const existingData = await getExistingDataFromLocalStorage()

    if (existingData) {
      dataUpdated.registeredUsers = existingData.registeredUsers
    }

    updateLocalStorage({ ...dataUpdated })
  }

  async function getExistingDataFromLocalStorage(): Promise<LocalStorageDataInterface | null> {
    const localStorageDataSerialized = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (localStorageDataSerialized) {
      return JSON.parse(localStorageDataSerialized)
    }
    return null
  }

  async function updateLocalStorage(data: LocalStorageDataInterface) {
    const updatedData: LocalStorageDataInterface = {
      ...data
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
  }

  useEffect(() => {
    if (!state.loggedUser && !state.registeredUsers?.length) return
    ;(async () => {
      await saveUserToLocalStorage()
    })()
  }, [state.registeredUsers?.length, state.loggedUser])

  useEffect(() => {
    ;(async () => {
      await getLoggedUserFromLocalStorage()

      const data = await getExistingDataFromLocalStorage()

      if (data) {
        data.registeredUsers?.forEach((user) => {
          actions.current.setUser(user)
        })
      }
    })()
  }, [])

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          ...actions.current,
          getLoggedUserFromLocalStorage,
          removeLoggedUserFromLocalStorage
        }
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
