import * as actionsTypes from './actions-types'
import { Dispatch } from 'react'
import { UserContextStateInterface } from './context.interface'

type action = {
  type: string
  payload: UserContextStateInterface
}

export const buildActions = (dispatch: Dispatch<action>) => {
  return {
    setUser: (user: UserContextStateInterface) =>
      dispatch({ type: actionsTypes.SET_USER, payload: user }),
    removeUser: () =>
      dispatch({ type: actionsTypes.REMOVE_USER, payload: { user: null } })
  }
}
