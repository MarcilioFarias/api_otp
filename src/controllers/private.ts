import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getUserById } from "../services/user";


export const test = async (req: ExtendedRequest, res: Response) => {
    if(!req.userId){
        res.status(401).json({error: 'Access denied'});
        return;
    }

    const user = await getUserById(req.userId);
    if(!user){
        res.status(404).json({error: 'User not found'});
        return;
    }
    
    res.json({user});
};