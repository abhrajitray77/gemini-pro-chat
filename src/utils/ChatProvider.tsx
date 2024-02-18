import React, { createContext, useState } from "react";

export type ChatMessageType = {
  type: string;
  content: string;
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

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};
