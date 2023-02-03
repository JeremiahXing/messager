import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../redis';
import { Message } from 'typings';

type Data = {
  messages: Message[]
}

type ErrorData = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ name: 'Method Not Allowed' })
    return;
  }
  
  const messagesRes = await redis.hvals('messages');
  const messages: Message[] = 
    messagesRes.map(
      (message) => {
        try {
          return JSON.parse(message)
        } catch (e) {
          return null;
        }
      }
    ).sort((a, b) => b.created_at - a.created_at);
  res.status(200).json({ messages })
}
