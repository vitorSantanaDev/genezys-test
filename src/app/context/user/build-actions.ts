import * as actionsTypes from './actions-types'
import { Dispatch } from 'react'
import { UserStateInterface } from './context.interface'

type action = {
  type: string
  payload?: UserStateInterface
}

export const buildActions = (dispatch: Dispatch<action>) => {
  return {
    setLoggedUser: (user: UserStateInterface) =>
      dispatch({ type: actionsTypes.SET_LOGGED_USER, payload: user }),
    removeLoggedUser: () => dispatch({ type: actionsTypes.REMOVE_LOGGED_USER }),
    setUser: (user: UserStateInterface) =>
      dispatch({ type: actionsTypes.SET_USER, payload: user }),
    removeUser: (user: UserStateInterface) =>
      dispatch({ type: actionsTypes.REMOVE_USER, payload: user })
  }
}
