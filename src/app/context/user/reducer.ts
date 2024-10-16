import { User } from '@/app/interfaces/user.interface'

import { UserContextState } from './state'

import * as actionsTypes from './actions-types'

type action = { type: string; payload: User | null }

export const reducer = (state: UserContextState, action: action) => {
  switch (action.type) {
    case actionsTypes.SET_USER: {
      return { ...state, user: action.payload }
    }
    case actionsTypes.REMOVE_USER: {
      return { ...state, user: null }
    }
  }
  return { ...state }
}
