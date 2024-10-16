import { HTMLAttributes } from 'react'

export type VariationOfButtonStyles = 'primary' | 'secondary' | 'tertiary'

export type SizeOfButtonStyles = 'medium' | 'small'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string
  size?: SizeOfButtonStyles
  variation?: VariationOfButtonStyles
}
