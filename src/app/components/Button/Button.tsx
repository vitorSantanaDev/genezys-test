import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ButtonProps } from './props.interface'

export function Button({
  label,
  size = 'medium',
  variation = 'primary',
  ...restButtonProps
}: ButtonProps) {
  const isPrimary = variation === 'primary'
  const isTertiary = variation === 'tertiary'
  const isSecondary = variation === 'secondary'

  const isSmall = size === 'small'

  return (
    <button
      {...restButtonProps}
      className={twMerge(
        'transition-colors duration-300 ease-in-out rounded-xl w-full',
        clsx(
          {
            'p-3': isSmall,
            'p-4': !isSmall
          },
          {
            'bg-accent-brand': isPrimary,
            'bg-background-tertiary': isSecondary && !isPrimary
          },
          {
            'border-2 border-solid border-border-primary':
              isTertiary && !isPrimary && !isSecondary
          },
          {
            'hover:bg-hover-primary': isPrimary,
            'hover:bg-hover-secondary hover:border-2 border-solid border-border-primary':
              isSecondary && !isPrimary && !isTertiary,
            'hover:bg-hover-tertiary hover:border-none':
              isTertiary && !isSecondary && !isPrimary
          }
        )
      )}
    >
      <label
        className={twMerge(
          'cursor-pointer',
          clsx(
            {
              'text-content-inverse': isPrimary,
              'text-content-primary': isSecondary && !isPrimary
            },
            {
              'text-text-medium': isPrimary,
              'text-text-small': isSecondary && !isPrimary
            }
          )
        )}
      >
        {label}
      </label>
    </button>
  )
}
