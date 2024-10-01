import React, { useEffect, useState } from "react";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { ChatModel } from "../models/chatModel";
import { UserModel } from "../models/userModel";
import { baseUrl, getReq } from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ChatUser = ({ chat }: { chat: ChatModel }) => {
  const { logInUser } = useSelector((state: RootState) => state.user);
  const [UserData, setUserData] = useState<null | UserModel>(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        let userId = "";
        chat?.members.map((uid) => {
          if (uid !== logInUser?._id) userId = uid;
        });
        const data = await getReq(`${baseUrl}/user/get/${userId}`);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (chat?.members.length === 2) {
      getUserData();
    }
  }, [chat, logInUser?._id]);
  return (
    <div className="flex gap-6 items-center w-full border-b py-2 px-7 mb-2 cursor-pointer hover:text-secondary">
      {chat?.members.length > 2 ? (
        <div className="border rounded-full p-2 text-white">
          <FaUserGroup className="text-[28px]" />
        </div>
      ) : (
        <div className="border rounded-full overflow-hidden w-[2.5rem]">
          <img
            src={UserData?.avatar}
            alt="profile"
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      <div>
        <p className="text-[18px] font-semibold">
          {chat?.chatname || UserData?.username}
        </p>
        <span>text</span>
      </div>
    </div>
  );
};

export default ChatUser;
