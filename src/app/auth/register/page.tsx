'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterFieldsInterface, RegisterSchema } from './resgister.defs'

import { Button } from '@/app/components/Button/Button'
import { getAddress } from '@/app/services/address.service'
import { TextInput } from '@/app/components/Input/TextInput'
import { useUserContext } from '@/app/context/user/useUserContext'

export default function Register() {
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFieldsInterface>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange'
  })

  const { actions: userContextActions } = useUserContext()

  const onSubmit = async (data: RegisterFieldsInterface) => {
    userContextActions.setUser({
      user: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    reset()
  }

  const populateAddressInfo = async () => {
    ;(async () => {
      const zipcode = watch('zipcode')

      if (!zipcode || errors['zipcode']) {
        return
      }

      const address = await getAddress(zipcode)

      if (!address) return

      setValue('uf', address.uf)
      setValue('city', address.city)
      setValue('address', address.address)
      setValue('neighborhood', address.neighborhood)
    })()
  }

  return (
    <main className="bg-background-primary  min-h-screen">
      <div className="p-4">
        <TextInput
          name="name"
          label="Nome"
          control={control}
          placeholder="Digite seu nome completo"
        />
        <TextInput
          name="email"
          label="E-mail"
          control={control}
          placeholder="Digite seu e-mail"
        />
        <div className="min-w-max flex flex-col">
          <h2 className="text-content-primary text-text-large mt-4 mb-2">
            Endereço
          </h2>
          <TextInput
            name="zipcode"
            placeholder="CEP"
            control={control}
            onBlur={populateAddressInfo}
          />
          <br />
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-4">
              <TextInput name="address" control={control} placeholder="Rua" />
              <TextInput
                name="neighborhood"
                control={control}
                placeholder="Bairro"
              />
            </div>
            <div className="flex flex-col gap-4">
              <TextInput name="city" control={control} placeholder="Cidade" />
              <TextInput name="uf" control={control} placeholder="Estado" />
            </div>
          </div>
        </div>
        <TextInput
          type="password"
          label="Senha"
          name="password"
          control={control}
          placeholder="Insira sua senha"
        />
        <TextInput
          type="password"
          label="Confirmar senha"
          name="confirmPassword"
          control={control}
          placeholder="Confirme sua senha"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variation="primary"
          label="Acessar conta"
          size="medium"
        />
      </div>
    </main>
  )
}
