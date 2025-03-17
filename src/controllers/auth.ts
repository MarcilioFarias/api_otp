import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth.signin";
import { authSignUoSchema } from "../schemas/auth.signup";
import { authUseOtpSchema } from "../schemas/auth.useotp";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../lib/mailtrap";
import { createJWT } from "../lib/jwt";


export const signin: RequestHandler = async (req, res) => {
    //validar os dados recebidos
    const data = authSignInSchema.safeParse(req.body);
    if(!data.success){
        res.json({error: data.error.flatten().fieldErrors});
        return;
    }
    //verificar se o usuário existe (email)
    const user = await getUserByEmail(data.data.email);
    if(!user){
        res.json({error: 'Usuário não encontrado'});
        return;
    }
    //gerar um codigo OTP para este usuário
    const otp = await generateOTP(user.id);

    //enviar um email para o usuário com o código OTP
    await sendEmail(
        user.email,
        'Your access code is ',
        'Type your access code in the app to continue:' + otp.code
    )
    //devolver o ID do codigo OTP
    res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
    //validar os dados recebidos
    const data = authSignUoSchema.safeParse(req.body);
    if(!data.success){
        res.json({error: data.error.flatten().fieldErrors});
        return;
    }
    //verificar se o usuário existe (email)
    const user = await getUserByEmail(data.data.email);
    if(user){
        res.json({error: 'Usuário já cadastrado'});
        return;
    }
    //criar um novo usuário
    const newUser = await createUser(data.data.name, data.data.email);
    
    //retorna dados do novo usuário
    res.status(201).json({message: 'Usuário cadastrado com sucesso', user: newUser});
}

export const useOtp: RequestHandler = async (req, res) =>{
    //validar os dados recebidos
    const data = authUseOtpSchema.safeParse(req.body);
    if(!data.success){
        res.json({error: data.error.flatten().fieldErrors});
        return;
    }
    //validar o OTP
    const user = await validateOTP(data.data.id, data.data.code);
    if(!user){
        res.json({error: 'Código inválido ou expirado'});
        return;
    }
    //Criar um token JWT
    const token = createJWT(user.id);

    //retornar o token JWT
    res.json({ token, user});
}