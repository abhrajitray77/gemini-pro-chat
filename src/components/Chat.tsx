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

  useEffect(() => {}, [chat]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="self-end cursor-pointer hover:text-red-500 text-neutral-400"
        onClick={clearChat}
      >
        <TbTrash className="h-6 w-6 transition duration-300" />
      </div>

      <ul className="max-h-[25rem] overflow-y-auto space-y-2">
        {/* Display chat messages */}
        {chat.map((message, index) => (
          <li
            key={index}
            className={`${
              message.type === "prompt" ? "bg-neutral-200" : "bg-[#428eff73]"
            } rounded-xl text-sm p-5 text-gray-800 space-x-5 flex`}
          >
            {message.type === "prompt" ? (
              <div>
                <span>You:</span>
                <p>{message.content}</p>
              </div>
            ) : (
              <div>
                <span>Gemini:</span>
                <p>{message.content}</p>
              </div>
            )}

            {message?.image && (
              <div className="p-2 bg-neutral-200">
                <img
                  src={message?.image}
                  alt="promt image"
                  width={160}
                  height={160}
                  className="max-w-[10rem] max-h-[10rem] rounded-xl object-cover"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
