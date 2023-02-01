'use client';
import { FormEvent, useState } from "react";
import { Message } from "typings";
import {v4 as uuid} from "uuid";
import useSWR from "swr";
import {fetchMessages as fetcher} from "../../utils/fetchMessages";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { data, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log("data", data);

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

    const messageToSend = message;
    setMessage("");

    const id = uuid();
    const newMessage: Message = {
      id,
      content: messageToSend,
      created_at: Date.now(),
      username: "user",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "jez.hsing.dev@gmail.com"
    };

    const uploadMessage = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newMessage,
        }),
      });
      const data = await res.json();
      // console.log("msg sent >>>>>>>", data);
    };
    uploadMessage();
  };

  return (
    <form onSubmit={addMessage}
      className="fixd bottom-0 z-50 w-full flex space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border border-gray-300 focus:ring-blue-600 focus:border-transparent 
                  px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Type your message here..."

      />
      <button
        type="submit"
        disabled={!message}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed"

      >
        Send
      </button>
    </form>
  );
}