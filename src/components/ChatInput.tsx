import { FormEvent, useContext, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegHourglassHalf } from "react-icons/fa6";


import query from "../lib/query"; // import the query function
import { ChatContext } from "../utils/ChatProvider";

const ChatInput = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setChat } = useContext(ChatContext);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    const input = prompt.trim();
    // Clear the prompt
    setPrompt("");

    // Add the prompt to the chat
    setChat((prevChat) => [...prevChat, { type: "prompt", content: input }]);

    // Call the query function with the prompt and model
    const res = await query(input, "gemini-pro");
    setLoading(false);

    // Check if the response is an error message
    if (res?.startsWith("Error:")) {
      // Display the error message
      setChat((prevChat) => [
        ...prevChat,
        { type: "response", content: `An error occured, ${res}` },
      ]);
      return;
    }

    // Add the response to the chat
    setChat((prevChat) => [...prevChat, { type: "response", content: res }]);
  };

  return (
    <div className="">
      <form
        className="mt-2 bg-neutral-200 text-gray-800 rounded-xl text-sm p-5 space-x-5 flex"
        onSubmit={sendMessage}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
      >
        <input
          type="text"
          className="bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300 focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          disabled={!prompt}
          className="flex bg-[#428eff] hover:bg-[#275497] group text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <FaRegHourglassHalf className="h-5 w-5 animate-spin" />
          ) : (
            <RiSendPlaneFill className="h-5 w-5 group-hover:rotate-45 transition duration-300" />
          )}
          
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
