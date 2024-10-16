import { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'

export interface ControlledInputProps extends HTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label?: string
  disabled?: boolean
  type?: HTMLInputTypeAttribute
}
