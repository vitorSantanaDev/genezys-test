import zod from 'zod'

export const LoginSchema = zod.object({
  email: zod
    .string({
      required_error: 'E-email is required'
    })
    .email(),
  password: zod
    .string({
      required_error: 'Password is required'
    })
    .min(8, 'Password must contain at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d+/, 'Password must contain at least one number')
    .regex(/[!@#$^&’]/, 'Password must contain at least one special character')
})

export interface LoginFieldsInterface {
  email: string
  password: string
}
