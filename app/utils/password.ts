import bcrypt from 'bcryptjs'

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}
