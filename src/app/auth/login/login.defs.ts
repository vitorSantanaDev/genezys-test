import zod from 'zod'

export const LoginSchema = zod.object({
  email: zod
    .string({
      required_error: 'O e-mail é obrigatório'
    })
    .email('Formato de e-mail inválido'),
  password: zod
    .string({
      required_error: 'A senha é obrigatória'
    })
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/\d+/, 'A senha deve conter pelo menos um número')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'A senha deve conter pelo menos um caractere especial'
    )
})

export interface LoginFieldsInterface {
  email: string
  password: string
}
