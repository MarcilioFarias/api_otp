import { prismaConnection } from "../lib/prisma";
import { v4 as uuid } from 'uuid';

export const generateOTP = async (userId: number) => {
    let otpArray: number[] = [];
    for(let q = 0; q < 6; q++){
        otpArray.push(Math.floor(Math.random() * 9));
    }

    let code = otpArray.join('');
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    const otp = await prismaConnection.otp.create({
        data: {
            id: uuid(),
            code,
            userId,
            expiresAt
        }
    });
    return otp;
}

export const validateOTP = async (id: string, code: string) => {
    const otp = await prismaConnection.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id,
            code,
            expiresAt: {
                gt: new Date()
            },
            used: false
        }
    });

    if( otp && otp.user) {
        await prismaConnection.otp.update({
            where: {
                id
            },
            data: {
                used: true
            }
        });
        return otp.user;
    }

    return false;
}