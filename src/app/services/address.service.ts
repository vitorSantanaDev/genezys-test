import axios from 'axios'
import {
  AddressInterface,
  AddressResponseInterface
} from '../interfaces/address.interface'
import { toast } from 'react-toastify'

export async function getAddress(zipcode: string) {
  try {
    const { data: responseData } = await axios.get(
      `https://viacep.com.br/ws/${zipcode.replace(/\D/g, '')}/json/`
    )

    const { localidade, logradouro, uf, bairro } =
      responseData as AddressResponseInterface

    const data: AddressInterface = {
      uf,
      city: localidade,
      address: logradouro,
      neighborhood: bairro
    }

    return data
  } catch (e) {
    toast.error(
      'Ocorreu algum ao buscar informações do CEP. Por favor tente mais tarde!'
    )
  }
}
