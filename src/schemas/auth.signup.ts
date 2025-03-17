import { z } from "zod";

export const authSignUoSchema = z.object({
    name: z.string({message: 'need a name'}).min(3, 'name must have at least 3 characters'),
    email: z.string({message: 'need an email'}).email('Invalid email'),
});