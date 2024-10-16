import CryptoJS from 'crypto-js'

export const USER_SECRET_KEY = 'user-scret-key'

export function encryptPassword(password: string, secretKey: string): string {
  const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString()
  return encrypted
}

export function decryptPassword(
  encryptedPassword: string,
  secretKey: string
): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey)
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

  if (!originalPassword) {
    throw new Error(
      'Failed to decrypt the password. Check the secret key or encrypted data.'
    )
  }

  return originalPassword
}
