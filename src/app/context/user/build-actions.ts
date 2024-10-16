import { User } from '@/app/interfaces/user.interface'
import * as actionsTypes from './actions-types'
import { Dispatch } from 'react'

type action = { type: string; payload: User | null }

export const buildActions = (dispatch: Dispatch<action>) => {
  return {
    setUser: (user: User) =>
      dispatch({ type: actionsTypes.SET_USER, payload: user }),
    removeUser: () =>
      dispatch({ type: actionsTypes.REMOVE_USER, payload: null })
  }
}
