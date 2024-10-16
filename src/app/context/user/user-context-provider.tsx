'use client'

import { buildActions } from './build-actions'
import { createContext, useEffect, useReducer, useRef } from 'react'
import { reducer } from './reducer'
import {
  INITIAL_STATE_USER_CONTEXT,
  INITIAL_STATE_USER_CONTEXT_ACTIONS,
  UserContextActions,
  UserContextState
} from './state'
import { User } from '@/app/interfaces/user.interface'

interface Props {
  children: React.ReactNode
}

export const UserContext = createContext<{
  state: UserContextState
  actions: UserContextActions
}>({
  state: INITIAL_STATE_USER_CONTEXT,
  actions: INITIAL_STATE_USER_CONTEXT_ACTIONS
})

const LOCAL_STORAGE_KEY = '@userSession'

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_USER_CONTEXT)

  const actions = useRef(buildActions(dispatch))

  function saveUserToLocalStorage(value: User) {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedValue)
    } catch (error) {
      console.error(error)
    }
  }

  function getUserFromLocalStorage() {
    try {
      const serializedValue = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || ''
      )
      actions.current.setUser(serializedValue)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!state.user) return
    saveUserToLocalStorage(state.user)
  }, [state.user])

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  return (
    <UserContext.Provider value={{ state, actions: actions.current }}>
      {children}
    </UserContext.Provider>
  )
}
