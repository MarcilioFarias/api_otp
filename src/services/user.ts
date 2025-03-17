import { prismaConnection } from "../lib/prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prismaConnection.user.findFirst({
        where: {
            email
        }
    });
    return user;
}

export const getUserById = async (id: number) => {
    const user = await prismaConnection.user.findFirst({
        where: { id  }
    });
    return user;
}

export const createUser = async (name: string, email: string) => {
    const user = await prismaConnection.user.create({
        data: { name, email }
    });
    return user;
}