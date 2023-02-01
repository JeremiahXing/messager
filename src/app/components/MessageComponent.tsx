import Image from "next/image";
import { Message } from "typings";

type Props = {
  key: string;
  message: Message;
};

export default function MessageComponent(props: Props) {
  const isUser = true;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src = {props.message.avatar}
          alt = 'avatar'
        />
      </div>
      <div>
        <div className={`text-[0.65rem] px-[2px] pb-[2px] 
          ${isUser ? "text-blue-400 text-right": "text-red-400 text-left"}`}
        >
          {props.message.username}
        </div>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white
            ${isUser ? "bg-blue-400 ml-auto order-2": "bg-red-400 mr-auto"}`}
          >
            <div>{props.message.content}</div>
          </div>
          <div className={`text-[0.65rem] italic px-2 text-gray-300
            ${isUser ? "text-right order-[-1]": "text-left"}`}
          >
            {new Date(props.message.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}