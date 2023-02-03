
import { Message } from 'typings';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

async function HomePage() {
  
  //server side rendering
  const data = await fetch(`${"https://"+process.env.NEXT_PUBLIC_VERCEL_URL || 'https://localhost:3000'}/api/getMessages`)
    .then(res => res.json())
    .catch(err => console.log(err));
  
  const messages: Message[] = data.messages;

  return (
    <main>
      {<MessageList initialMessages={messages}/> }
      {/* <MessageList/> */}
      <ChatInput/>
    </main>
  )
}

export default HomePage;