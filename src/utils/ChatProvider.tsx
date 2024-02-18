import React, { createContext, useEffect, useState } from "react";

export type ChatMessageType = {
  type: string;
  content: string;
  image?: string;
};

export type ChatContextType = {
  chat: ChatMessageType[];
  setChat: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
};

export const ChatContext = createContext<ChatContextType>({
  chat: [],
  setChat: () => {},
});

type ChatProviderProps = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chat, setChat] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    // Retrieve chat from local storage if already there else set it to an empty array
    const storedChat = JSON.parse(localStorage.getItem("chat") || "[]");
    if (storedChat.length > 0) {
      setChat(storedChat);
    }
  }, []);

  // Update local storage whenever chat changes
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);
  
  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};
