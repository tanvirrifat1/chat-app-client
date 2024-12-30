import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MesageInput from "./MesageInput";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessgesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessgesLoading) return <div>Loading...</div>;

  return (
    <div>
      <ChatHeader />
      <p>Message...</p>
      <MesageInput />
    </div>
  );
};

export default ChatContainer;
