import Pusher from "./node_modules/pusher";
import ClientPusher from "pusher-js";

// console.log("PUSHER_SERVER_APPID", process.env.PUSHER_SERVER_APPID);
export const serverPusher = new Pusher({
  appId: process.env.PUSHER_SERVER_APPID!,
  key: process.env.PUSHER_SERVER_KEY!,
  secret: process.env.PUSHER_SERVER_SECRET!,
  cluster: "ap4",
  useTLS: true
});

export const clientPusher = new ClientPusher(process.env.PUSHER_CLIENT_KEY!, {
  cluster: 'ap4',
  forceTLS: true
});

