'use client';
import { FormEvent, useState } from "react";
import { Message } from "typings";
import {v4 as uuid} from "uuid";
import useSWR from "swr";
import {fetchMessages as fetcher} from "../../utils/fetchMessages";
// import {uploadMessage} from "../../utils/uploadMessage";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  // if (error) return <div>failed to load</div>;
  // console.log("msgs", messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
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
      avatar: "https://gravatar.com/avatar/1f453dff9349d4f73627b957a92db99f?s=400&d=identicon&r=x",
      email: "jez.hsing.dev@gmail.com"
    };

    const uploadMessage = async (msg: Message) => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          msg,
        }), 
      }).then(res => res.json());
      
      return [data.message, ...messages!];
    };


    await mutate(uploadMessage(newMessage), {
      // optimisticData is the data that presumed to be used to render the UI (no need to fetch if it hits).
      optimisticData: [newMessage, ...messages!],
      // if it miss we rollback to the right data.
      rollbackOnError: true,
    });

    // const aiRes = await fetch("/api/chatGPT", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     newMessage,
    //   }), 
    // }).then(res => res.json());

    // const aiMessage: Message = aiRes.message;

    // await mutate(uploadMessage(aiMessage), {
    //   // optimisticData is the data that presumed to be used to render the UI (no need to fetch if it hits).
    //   optimisticData: [aiMessage, ...messages!],
    //   // if it miss we rollback to the right data.
    //   rollbackOnError: true,
    // });
  };

  return (
    <form onSubmit={addMessage}
      className="fixed bg-white
        bottom-0 
        z-50 w-full 
        flex px-10 py-5
        space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border border-gray-300 
            focus:ring-blue-600 focus:border-transparent 
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