import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../redis';
import { Message } from 'typings';
import { serverPusher } from '../../../pusher';

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
  const { msg } = req.body;
  const serverDateMsg = {
    ...msg,
    created_at: Date.now()
  }

  await redis.hset('messages', msg.id, JSON.stringify(serverDateMsg));
  serverPusher.trigger('messages', 'new-message', serverDateMsg);

  res.status(200).json({ message: serverDateMsg})
}
