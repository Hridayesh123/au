import * as express from 'express';
import * as bodyParser from 'body-parser';
import subjectRoutes from './routes_container/Routes';
import { Server } from 'http';
import * as jwt from 'jsonwebtoken';

const app = express();
const key = "key";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', subjectRoutes);
app.use('/subject', subjectRoutes);

const server: Server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default server;