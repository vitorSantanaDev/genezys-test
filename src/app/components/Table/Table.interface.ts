import { UserInterface } from '@/app/interfaces/user.interface'

export interface TableProps {
  users: UserInterface[]
  itemsPerPage: number
}
