'use client';

import { clientPusher } from "../../../pusher";
import { useEffect } from "react";
import useSWR from "swr";
import { Message } from "typings";
import { fetchMessages as fetcher } from "../../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};

export default function MessageList({initialMessages}: Props) {
  const { 
    data: messages, 
    error, 
    mutate
  } = useSWR("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      // if you send the msg don't mutate
      if (messages?.find((message) => message.id === data.id)) return;

      if(!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }

      // remember to disconnect the channel when the component unmounts
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    });
  }, [messages, mutate, clientPusher]);
  // console.log("messages", messages || initialMessages);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto bg-white">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}