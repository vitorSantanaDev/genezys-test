'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/components/Button/Button'
import { TextInput } from '@/app/components/Input/TextInput'

import { LoginFieldsInterface, LoginSchema } from './login.defs'

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFieldsInterface>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = async (data: LoginFieldsInterface) => {
    console.log({ data })
  }

  return (
    <main className="bg-background-primary text-content-primary min-h-screen flex items-center justify-between gap-2">
      <div className="bg-blur min-h-screen w-0.5 bg-cover bg-center"></div>
      <div className="p-4">
        <TextInput
          name="email"
          label="E-mail"
          control={control}
          placeholder="Digite seu e-mail"
        />
        <TextInput
          type="password"
          label="Senha"
          name="password"
          control={control}
          placeholder="Insira sua senha"
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
