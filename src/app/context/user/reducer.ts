import * as actionsTypes from './actions-types'
import {
  UserContextStateInterface,
  UserStateInterface
} from './context.interface'

type action = { type: string; payload?: UserStateInterface }

export const reducer = (
  state: UserContextStateInterface,
  action: action
): UserContextStateInterface => {
  switch (action.type) {
    case actionsTypes.SET_LOGGED_USER: {
      return {
        ...state,
        loggedUser: action.payload
      }
    }

    case actionsTypes.REMOVE_LOGGED_USER: {
      return {
        ...state,
        loggedUser: null
      }
    }

    case actionsTypes.SET_USER: {
      const newUser = action.payload

      if (!newUser) return { ...state }

      const { registeredUsers = [] } = state

      const userAlreadyExists = registeredUsers.find(
        (user) => user.email === newUser.email
      )

      const updatedUsers = userAlreadyExists
        ? registeredUsers.filter((user) => user.email !== newUser.email)
        : registeredUsers

      return {
        ...state,
        registeredUsers: [...updatedUsers, newUser]
      }
    }

    case actionsTypes.REMOVE_USER: {
      return {
        ...state,
        registeredUsers: state.registeredUsers?.filter(
          (user) => user.email !== action.payload?.email
        )
      }
    }
  }
  return { ...state }
}
