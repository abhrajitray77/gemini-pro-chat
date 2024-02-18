import { useContext, useEffect} from "react";
import { TbTrash } from "react-icons/tb";
import { ChatContext } from "../utils/ChatProvider";

const Chat = () => {
  const { prompts, setPrompts, responses, setResponses } =
    useContext(ChatContext);

  //refresh the chat component when context state changes
  useEffect(() => {
    
  }, [prompts, responses]); 

//delete the chat from local storage
  const clearChat = () => {
    localStorage.removeItem("prompt");
    localStorage.removeItem("response");
    setPrompts([]);
    setResponses([]);
  };

  return (
    <div className="flex flex-col">
      <div
        className="self-end cursor-pointer hover:text-red-500 text-neutral-400"
        onClick={clearChat}
      >
        <TbTrash className="h-6 w-6 transition duration-300" />
      </div>

      <div className="max-h-[25rem] overflow-y-scroll">
        {/* retrieve chats from local storage */}
        {prompts.length === 0 ? (
          <div className="text-center text-2xl text-gray-400">
            Type Something!
          </div>
        ) : (
          prompts?.map((prompt, index) => (
            <div key={index} className="bg-gray-100 p-3 my-3 rounded-xl">
              <div className="text-gray-500 font-bold">You:</div>
              <div>{prompt}</div>
            </div>
          ))
        )}
        {prompts && responses && prompts.length === responses.length ? (
          responses?.map((response, index) => (
            <div key={index} className="bg-gray-100 p-3 my-3 rounded-xl">
              <div className="text-gray-500 font-bold">Gemini:</div>
              <div>{response}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl text-gray-400">
            Waiting for a response...
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
