'use client'

import Image from 'next/image'
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'

import LogoutIcon from '../../../../public/svg/logout_icon.svg'

import { USERS_MOCK } from '@/mock/users'

import { Routing } from '@/app/enum/routes.enum'
import { UserTable } from '@/app/components/Table/Table'
import { Loading } from '@/app/components/Loading/Loading'
import { useUserContext } from '@/app/context/user/useUserContext'

export default function Home() {
  const {
    state: { loggedUser: user },
    actions: { removeLoggedUserFromLocalStorage }
  } = useUserContext()

  const [isLoadingUser, toggleIsLoadingUser] = useReducer((prev) => !prev, true)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace(Routing.LOGIN)
      toggleIsLoadingUser()
    } else {
      toggleIsLoadingUser()
    }
  }, [user])

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <main className="px-32 py-16 bg-background-primary text-content-primary min-h-screen">
      <div className="py-4 w-full flex justify-between items-center">
        {user && (
          <p className="text-content-heading text-text-medium">
            <span className="text-content-muted">Logado como:</span>{' '}
            {user.email}
          </p>
        )}
        <button
          onClick={removeLoggedUserFromLocalStorage}
          className="hover:bg-background-tertiary px-4 py-3 bg-background-secondary rounded-xl flex justify-center items-center"
        >
          <Image src={LogoutIcon} alt="Icone de logout" />
        </button>
      </div>
      <UserTable users={USERS_MOCK} itemsPerPage={5} />
    </main>
  )
}
