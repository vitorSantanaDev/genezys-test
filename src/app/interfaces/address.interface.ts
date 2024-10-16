export interface AddressResponse {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  estado: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  regiao: string
  siafi: string
  uf: string
  unidade: string
}

export interface Address {
  uf: string
  city: string
  address: string
  neighborhood: string
}
