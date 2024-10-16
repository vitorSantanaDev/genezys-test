'use client'

import { buildActions } from './build-actions'
import { createContext, useEffect, useReducer, useRef } from 'react'
import { reducer } from './reducer'
import {
  INITIAL_STATE_USER_CONTEXT,
  INITIAL_STATE_USER_CONTEXT_ACTIONS
} from './state'

import {
  decryptPassword,
  encryptPassword,
  USER_SECRET_KEY
} from '@/utils/encrypt-password'
import {
  UserContextActionsInterface,
  UserContextProviderProps,
  UserContextStateInterface
} from './context.interface'

export const UserContext = createContext<{
  state: UserContextStateInterface
  actions: UserContextActionsInterface
}>({
  state: INITIAL_STATE_USER_CONTEXT,
  actions: INITIAL_STATE_USER_CONTEXT_ACTIONS
})

const LOCAL_STORAGE_KEY = '@userSession'

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_USER_CONTEXT)

  const actions = useRef(buildActions(dispatch))

  function saveUserToLocalStorage(value: UserContextStateInterface) {
    try {
      const serializedValue = JSON.stringify(value.user)
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedValue)
    } catch (error) {
      console.error(error)
    }
  }

  function getUserFromLocalStorage() {
    try {
      const serializedValue: UserContextStateInterface = {
        user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '')
      }

      if (!serializedValue.user) return

      console.log(
        decryptPassword(
          serializedValue.user?.password as string,
          USER_SECRET_KEY
        )
      )

      actions.current.setUser({
        user: {
          ...serializedValue.user,
          password: decryptPassword(
            serializedValue.user?.password as string,
            USER_SECRET_KEY
          )
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!state.user) return
    // TODO: it is not recommended to make this operation on the front-end for user security reasons. But this is just an example of authentication
    const userPassword = encryptPassword(state.user.password, USER_SECRET_KEY)
    saveUserToLocalStorage({
      user: {
        ...state.user,
        password: userPassword
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user?.email, state.user?.password, state.user?.name])

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  return (
    <UserContext.Provider value={{ state, actions: actions.current }}>
      {children}
    </UserContext.Provider>
  )
}
