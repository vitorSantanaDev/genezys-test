import { z as zod } from 'zod'

export const RegisterSchema = zod
  .object({
    name: zod
      .string({
        required_error: 'O nome é obrigatório'
      })
      .min(2, 'O nome deve conter pelo menos 2 caracteres'),

    email: zod
      .string({
        required_error: 'O e-mail é obrigatório'
      })
      .email('Por favor, insira um e-mail válido'),

    zipcode: zod
      .string({
        required_error: 'O CEP é obrigatório'
      })
      .regex(
        /^\d{5}-?\d{3}$/,
        'Por favor, insira um CEP válido (formato: 12345-678 ou 12345678)'
      ),

    address: zod
      .string({
        required_error: 'O endereço é obrigatório'
      })
      .min(5, 'O endereço deve conter pelo menos 5 caracteres'),

    neighborhood: zod
      .string({
        required_error: 'O bairro é obrigatório'
      })
      .min(3, 'O bairro deve conter pelo menos 3 caracteres'),

    city: zod
      .string({
        required_error: 'A cidade é obrigatória'
      })
      .min(2, 'A cidade deve conter pelo menos 2 caracteres'),

    uf: zod
      .string({
        required_error: 'A UF é obrigatória'
      })
      .length(2, 'A UF deve ter exatamente 2 caracteres'),

    password: zod
      .string({
        required_error: 'A senha é obrigatória'
      })
      .min(8, 'A senha deve conter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/\d+/, 'A senha deve conter pelo menos um número')
      .regex(
        /[!@#$^&’]/,
        'A senha deve conter pelo menos um caractere especial'
      ),

    confirmPassword: zod
      .string({
        required_error: 'A confirmação de senha é obrigatória'
      })
      .min(8, 'A confirmação de senha deve conter pelo menos 8 caracteres')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  })

export interface RegisterFieldsInterface {
  name: string
  email: string
  zipcode: string
  address: string
  neighborhood: string
  password: string
  confirmPassword: string
  city: string
  uf: string
}
