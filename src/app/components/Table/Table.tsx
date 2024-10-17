import { useState } from 'react'
import { TableProps } from './Table.interface'

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
]

export function UserTable({ users, itemsPerPage }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(users.length / itemsPerPage)

  function handlePrevious() {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  function handleNext() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem)

  function getInitials(name: string) {
    const [firstName, lastName] = name.split(' ')
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="bg-background-secondary p-6 rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lista de usuários</h2>
      </div>
      <table className="w-full table-auto border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-content-body">
            <th>Nome</th>
            <th>Endereço</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(
            (
              { name, email, address: { address, neighborhood, city, uf } },
              index
            ) => (
              <tr key={index} className="bg-background-tertiary">
                <td className="flex items-center p-4">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full text-white font-bold mr-3 ${
                      colors[index % colors.length]
                    }`}
                  >
                    {getInitials(name)}
                  </div>
                  <div>
                    <p>{name}</p>
                  </div>
                </td>
                <td className="p-4 max-w-xs truncate">
                  {address}, {neighborhood}, {city}, {uf}
                </td>
                <td className="p-4">{email}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-background-tertiary rounded-lg"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Anterior
        </button>
        <p className="text-content-body">
          Página {currentPage} de {totalPages}
        </p>
        <button
          className="px-4 py-2 bg-background-tertiary rounded-lg"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
