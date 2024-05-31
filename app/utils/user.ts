// Пример функций для работы с БД
import prisma from './connect'

export async function getUserFromDb(userName: string) {
    const user = await prisma.user.findUnique({
        where: { userName },
    })
    return user
}

export async function addUserToDb(userName: string, passwordHash: string) {
    const newUser = await prisma.user.create({
        data: {
            userName,
            passwordHash,
        },
    })
    return newUser
}
