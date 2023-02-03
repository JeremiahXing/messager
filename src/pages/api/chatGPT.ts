import type { NextApiRequest, NextApiResponse } from 'next'
import { Message } from 'typings';
import { openAI } from 'openai';
import {v4 as uuid} from "uuid";

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
  if (!newMessage) {
    res.status(400).json({ name: 'Bad Request' })
    return;
  }
  if(newMessage.username !== "user") {
    res.status(400).json({ name: 'Bad Request' })
    return;
  }

  const aiRes = await openAI.sendMessage(newMessage.content);

  const aiMessage: Message = {
    id: uuid(),
    content: aiRes.text,
    created_at: Date.now(),
    username: "ai",
    avatar: "https://gravatar.com/avatar/1f453dff9349d4f73627b957a92db99f?s=400&d=identicon&r=x",
    email: "fake@ai.com",
  };


  res.status(200).json({ message: aiMessage});
}

