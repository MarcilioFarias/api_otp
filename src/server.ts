import express, {urlencoded} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mainRoute from './routes/mainRoute';

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({extended: true}));
server.use(express.json());

server.use(mainRoute);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log( `Server is running on http://localhost:${PORT}`);
});