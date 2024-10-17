import { AddressInterface } from './address.interface'

export interface UserInterface {
  email: string
  name: string
  address: AddressInterface
}
