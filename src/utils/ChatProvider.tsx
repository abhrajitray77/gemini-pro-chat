import React, { createContext, useState } from "react";

export type chatContextType = {
  prompts: string[];
  setPrompts: (value: string[]) => void;
  responses: string[];
  setResponses: (value: string[]) => void;
};

export const ChatContext = createContext<chatContextType>({
  prompts: [],
  setPrompts: () => {},
  responses: [],
  setResponses: () => {},
});

type chatProviderProps = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<chatProviderProps> = ({ children }) => {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  return (
    <ChatContext.Provider value={{ prompts, setPrompts, responses, setResponses }}>
      {children}
    </ChatContext.Provider>
  );
};
