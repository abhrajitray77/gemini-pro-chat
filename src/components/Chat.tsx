import { useContext, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { ChatContext } from "../utils/ChatProvider";

const Chat = () => {
    const { chat, setChat } = useContext(ChatContext);

  //delete the chat from local storage
  const clearChat = () => {
    localStorage.removeItem("prompt");
    localStorage.removeItem("response");
    setChat([]);
  };

  useEffect(() => {
    // Your logic to handle context state changes and updates
  }, [chat]);

  return (
    <div className="flex flex-col">
      <div
        className="self-end cursor-pointer hover:text-red-500 text-neutral-400"
        onClick={clearChat}
      >
        <TbTrash className="h-6 w-6 transition duration-300" />
      </div>

      <div className="max-h-[25rem] overflow-y-scroll">
        {/* Display chat messages */}
        {chat.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === "prompt"
                ? "bg-neutral-200 text-gray-800"
                : "bg-[#428eff73] text-white"
            } rounded-xl text-sm p-5 space-x-5 flex`}
          >
            {
                message.type === "prompt" ? (
                    <div>
                        <span>You:</span>
                        <p>{message.content}</p>

                    </div>

                ) : (
                    <div>
                        <span>Gemini:</span>
                        <p>{message.content}</p>
                    </div>
                )
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
