import * as actionsTypes from './actions-types'
import { UserContextStateInterface } from './context.interface'

type action = { type: string; payload: UserContextStateInterface }

export const reducer = (
  state: UserContextStateInterface,
  action: action
): UserContextStateInterface => {
  switch (action.type) {
    case actionsTypes.SET_USER: {
      return { ...state, user: action.payload.user }
    }
    case actionsTypes.REMOVE_USER: {
      return { ...state, user: null }
    }
  }
  return { ...state }
}
