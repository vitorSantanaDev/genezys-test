import axios from 'axios'
import {
  AddressInterface,
  AddressResponseInterface
} from '../interfaces/address.interface'

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
    console.error(e)
  }
}
