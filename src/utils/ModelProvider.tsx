import React, { createContext, useState, ReactNode } from "react";

interface ModelContextProps {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}

export const ModelContext = createContext<ModelContextProps>({
  model: "gemini-pro",
  setModel: () => {},
});

interface ModelProviderProps {
  children: ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({
  children,
}) => {
    const [model, setModel] = useState<string>("gemini-pro");

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};
