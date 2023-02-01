import { Message } from "typings";


export const uploadMessage = async (msg: Message) => {
  const data = await fetch("/api/addMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      msg,
    }), 
  }).then(res => res.json());
  
  return data.message;
};