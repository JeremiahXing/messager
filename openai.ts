import { ChatGPTAPI } from 'chatgpt'

export const openAI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY!,
});