import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import { baseUrl, getReq } from "../services/api";
import { ChatModel } from "../models/chatModel";

const MainLeft = () => {
  const [myChats, setMyChats] = useState<ChatModel[] | null>(null);
  useEffect(() => {
    const getChats = async () => {
      const chats = (await getReq(`${baseUrl}/chat`)) as ChatModel[];
      setMyChats(chats);
    };
    getChats();
  }, []);
  return (
    <div className="w-1/2 border rounded-s">
      {myChats
        ? myChats.map((chat) => {
            return <ChatUser chat={chat} key={chat.id} />;
          })
        : "Add new friends to start messaging"}
    </div>
  );
};

export default MainLeft;
