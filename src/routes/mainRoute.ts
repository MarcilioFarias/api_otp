import express from 'express';
import { ping } from '../controllers/ping';
import { signin, signup, useOtp } from '../controllers/auth';
import * as privateController from '../controllers/private';
import { verifyJWT } from '../lib/jwt';

const mainRoute = express.Router();

mainRoute.get('/ping', ping);
mainRoute.post('/auth/signin', signin);
mainRoute.post('/auth/signup', signup);

mainRoute.post('/auth/useotp', useOtp);

mainRoute.get('/private', verifyJWT, privateController.test);

export default mainRoute;