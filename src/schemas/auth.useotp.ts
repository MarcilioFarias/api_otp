import { z } from "zod";

export const authUseOtpSchema = z.object({
    id: z.string({message: 'need an id'}),
    code: z.string().length(6,{message: 'code must have 6 characters'})
});