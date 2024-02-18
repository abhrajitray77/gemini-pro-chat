import { useEffect, useState } from "react";

const Chat = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    //check if there are any chats in local storage
    const localPrompts = localStorage.getItem("prompts");
    const localResponses = localStorage.getItem("responses");
    //if there are chats, set the state to the chats
    localPrompts && setPrompts(JSON.parse(localPrompts));
    localResponses && setResponses(JSON.parse(localResponses));

    //check if chats have been updated and update the state
    window.addEventListener("storage", (e) => {
      if (e.newValue && e.key === "prompts") {
        setPrompts(JSON.parse(e.newValue));
      }
      if (e.newValue && e.key === "responses") {
        setResponses(JSON.parse(e.newValue));
      }
    });

    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);

  return (
    <div>
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
  );
};

export default Chat;
