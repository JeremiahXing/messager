import React from 'react';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

export default function HomePage() {
  return (
    <main>
      <MessageList/>
      <ChatInput/>
    </main>
  )
}