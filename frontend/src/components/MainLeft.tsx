import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import { baseUrl, getReq } from "../services/api";
import { ChatModel } from "../models/chatModel";
import SearchBox from "./SearchBox";

const MainLeft = () => {
  const [myChats, setMyChats] = useState<ChatModel[] | null>(null);
  useEffect(() => {
    const getChats = async () => {
      const chats = (await getReq(`${baseUrl}/chat`)) as ChatModel[];
      chats.length ? setMyChats(chats) : setMyChats(null);
    };
    getChats();
  }, []);
  return (
    <div className="w-full md:w-1/2 border rounded-s py-3 flex flex-col items-center gap-2">
      <SearchBox />
      {myChats ? (
        myChats.map((chat) => {
          return <ChatUser chat={chat} key={chat._id} />;
        })
      ) : (
        <div className="h-full flex items-center">
          Add new friends to start messaging
        </div>
      )}
    </div>
  );
};

export default MainLeft;
