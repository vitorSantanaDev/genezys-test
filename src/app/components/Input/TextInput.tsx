'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Controller } from 'react-hook-form'

import Image from 'next/image'

import ErrorIcon from '../../../../public/svg/error_icon.svg'

import { ControlledInputProps } from './props.interface'

export function TextInput({
  name,
  type,
  label,
  control,
  disabled,
  ...restInputProps
}: ControlledInputProps) {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors }
      }) => {
        function handleFocus() {
          setIsFocus((prev) => !prev)
        }

        function handleBlur() {
          onBlur && onBlur()
          setIsFocus((prev) => !prev)
        }

        const hasError = !!errors[name]?.message

        return (
          <div className="flex flex-col gap-1">
            {label && (
              <label
                className="text-content-primary text-text-large"
                htmlFor={name}
              >
                {label}
              </label>
            )}
            <input
              type={type}
              disabled={disabled}
              className={twMerge(
                'min-w-max py-2 px-4 outline-none border-2 border-solid bg-background-secondary rounded-md text-text-medium text-content-body',
                clsx({
                  'border-border-primary': !hasError,
                  'border-accent-red': hasError,
                  'border-accent-brand': isFocus
                })
              )}
              onChange={({ target }) => {
                onChange(target.value)
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              {...restInputProps}
            />
            {errors[name]?.message?.toString() && (
              <span className="text-text-small text-accent-red flex items-center gap-1">
                <Image
                  alt="Icone de erro"
                  src={ErrorIcon}
                  width={16}
                  height={16}
                />
                {errors[name]?.message?.toString()}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}
