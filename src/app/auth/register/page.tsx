'use client'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Routing } from '@/app/enum/routes.enum'
import { Button } from '@/app/components/Button/Button'
import { Loading } from '@/app/components/Loading/Loading'
import { getAddress } from '@/app/services/address.service'
import { TextInput } from '@/app/components/Input/TextInput'
import { useUserContext } from '@/app/context/user/useUserContext'
import { RegisterFieldsInterface, RegisterSchema } from './resgister.defs'
import { toast } from 'react-toastify'

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

  const router = useRouter()

  const [isLoadingUser, toggleIsLoadingUser] = useReducer((prev) => !prev, true)

  const {
    state: { loggedUser, registeredUsers },
    actions: { setLoggedUser, setUser, getLoggedUserFromLocalStorage }
  } = useUserContext()

  const onSubmit = async (data: RegisterFieldsInterface) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password
      }

      const userAlreadyRegistered = registeredUsers?.find(
        (user) => user.email === payload.email
      )

      if (userAlreadyRegistered) {
        toast.error('Este email jás está em uso!')
        return
      }

      setUser(payload)
      setLoggedUser(payload)
      toast.success('Usuário criado com sucesso!')

      reset({
        uf: '',
        name: '',
        city: '',
        email: '',
        zipcode: '',
        address: '',
        password: '',
        neighborhood: '',
        confirmPassword: ''
      })

      router.push(Routing.HOME)
    } catch (err) {
      toast.error(
        'Ocorreu algum erro ao criar o usuário, por favor tente mais tarde!'
      )
    }
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

  useEffect(() => {
    ;(async () => {
      await getLoggedUserFromLocalStorage?.()
      toggleIsLoadingUser()
    })()
  }, [])

  useEffect(() => {
    if (loggedUser) {
      router.replace(Routing.HOME)
    }
  }, [loggedUser])

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <main className="bg-background-primary  min-h-screen w-full flex flex-col justify-center">
      <div className="px-16 py-8 w-full">
        <Link href={Routing.LOGIN}>
          <p className="text-content-primary text-right text-text-small cursor-pointer">
            Já tem uma conta?{' '}
            <span className="text-accent-brand">Acessar conta</span>
          </p>
        </Link>
        <h1 className="text-content-primary text-left text-2xl mt-4 mb-2">
          Criar Conta
        </h1>
        <div className="flex items-center justify-between"></div>
        <TextInput
          name="name"
          label="Nome"
          control={control}
          placeholder="Digite seu nome completo"
        />
        <br />
        <TextInput
          name="email"
          label="E-mail"
          control={control}
          placeholder="Digite seu e-mail"
        />
        <br />
        <div className="w-full">
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
            <div className="w-6/12">
              <TextInput name="address" control={control} placeholder="Rua" />
              <br />
              <TextInput
                name="neighborhood"
                control={control}
                placeholder="Bairro"
              />
            </div>
            <div className="w-6/12">
              <TextInput name="city" control={control} placeholder="Cidade" />
              <br />
              <TextInput name="uf" control={control} placeholder="Estado" />
            </div>
          </div>
        </div>
        <br />
        <TextInput
          type="password"
          label="Senha"
          name="password"
          control={control}
          placeholder="Insira sua senha"
        />
        <br />
        <TextInput
          type="password"
          label="Confirmar senha"
          name="confirmPassword"
          control={control}
          placeholder="Confirme sua senha"
        />
        <br />
        <Button
          onClick={handleSubmit(onSubmit)}
          variation="primary"
          label="Criar conta"
          size="medium"
        />
      </div>
    </main>
  )
}
