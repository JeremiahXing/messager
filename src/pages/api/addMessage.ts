// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../redis';
import { Message } from 'typings';

type Data = {
  message: Message
}

type ErrorData = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ name: 'Method Not Allowed' })
    return;
  }
  const { newMessage } = req.body;
  const serverDateMsg = {
    ...newMessage,
    created_at: Date.now()
  }

  await redis.hset('messages', newMessage.id, JSON.stringify(serverDateMsg));
  res.status(200).json({ message: serverDateMsg})
}
