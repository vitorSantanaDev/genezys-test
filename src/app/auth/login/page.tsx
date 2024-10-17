'use client'

import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Routing } from '@/app/enum/routes.enum'
import { Button } from '@/app/components/Button/Button'
import { Loading } from '@/app/components/Loading/Loading'
import { TextInput } from '@/app/components/Input/TextInput'
import { LoginFieldsInterface, LoginSchema } from './login.defs'
import { useUserContext } from '@/app/context/user/useUserContext'

export default function Login() {
  const {
    state: { loggedUser, registeredUsers },
    actions: { setLoggedUser: setUser }
  } = useUserContext()

  const [isLoadingUser, toggleIsLoadingUser] = useReducer((prev) => !prev, true)

  const { control, handleSubmit } = useForm<LoginFieldsInterface>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'vitor@email.com',
      password: '654asd321ASD!'
    }
  })

  const router = useRouter()

  const onSubmit = async (data: LoginFieldsInterface) => {
    const user = registeredUsers?.find((user) => user.email === data.email)

    if (!user) {
      throwUnregisteredUserError()
      return
    }

    const { password: userPassword, email: userEmail } = user

    const { password, email } = data

    if (password === userPassword && email === userEmail) {
      setUser(user)
      router.replace(Routing.HOME)
      return
    }

    toast.error('Email ou senha inválidos')
  }

  function throwUnregisteredUserError() {
    toast.error('Usuário não cadastrado!')
  }

  useEffect(() => {
    if (loggedUser) {
      router.replace(Routing.HOME)
      toggleIsLoadingUser()
    } else {
      toggleIsLoadingUser()
    }
  }, [loggedUser])

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <main className="w-full bg-background-primary min-h-screen flex flex-col  justify-center">
      <div className="px-16 py-8 w-full">
        <Link href={Routing.REGISTER}>
          <p className="text-content-primary text-right text-text-small cursor-pointer">
            não tem uma conta?{' '}
            <span className="text-accent-brand">Criar conta</span>
          </p>
        </Link>
        <h1 className="text-content-primary text-left text-2xl mt-4 mb-2">
          Acessar conta
        </h1>
        <br />
        <TextInput
          name="email"
          label="E-mail"
          control={control}
          placeholder="Digite seu e-mail"
        />
        <br />
        <TextInput
          type="password"
          label="Senha"
          name="password"
          control={control}
          placeholder="Insira sua senha"
        />
        <br />
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
