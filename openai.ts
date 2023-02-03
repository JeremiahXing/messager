import { ChatGPTAPI } from 'chatgpt'

export const openAI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY!,
  completionParams: {
    prompt: 'hi i am siri',
    model: 'text-davinci-003'
  }
});