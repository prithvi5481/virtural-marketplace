// app/api/socket/route.ts
import { NextApiResponse } from 'next';
import { Server } from 'socket.io';

export default function handler(req: Request, res: any) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}