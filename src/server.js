import { io } from 'socket.io-client';
import 'dotenv.config';

const socket = io(process.env.SERVER_URL);

export default socket;
