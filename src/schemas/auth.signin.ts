import { z } from 'zod';

export const authSignInSchema = z.object({
    email: z.string({message: 'need an email'}).email('Invalid email'),
});