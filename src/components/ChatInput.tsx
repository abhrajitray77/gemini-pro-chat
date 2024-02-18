import { FormEvent, useContext, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCameraRetro, FaRegHourglassHalf } from "react-icons/fa6";
import { ChatContext } from "../utils/ChatProvider";
import { ModelContext } from "../utils/ModelProvider";
import { imageQuery, textQuery } from "../lib/query";

const ChatInput = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [file, setFile] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { model } = useContext(ModelContext);
  const { setChat } = useContext(ChatContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
    }
  };

  const handleClick = () => {
    const fileInputEl = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;
    if (fileInputEl) {
      fileInputEl.click();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileToGenerativePart = async (file: any) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    //for vision model

    const fileInputEl = document.querySelector("input[type=file]") as HTMLInputElement;
    const imageParts = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [...fileInputEl.files].map(fileToGenerativePart)
    );

    console.log(fileInputEl?.files?.item(0));

    setLoading(true);
    const input = prompt.trim();
    // Clear the prompt
    setPrompt("");

    const result =
      model === "gemini-pro"
        ? await textQuery(input, model)
        : await imageQuery(input, model, imageParts);

    // Add the prompt to the chat
    model === "gemini-pro"
      ? setChat((prevChat) => [...prevChat, { type: "prompt", content: input }])
      : setChat((prevChat) => [
          ...prevChat,
          { type: "prompt", content: input, image: file },
        ]);

    setLoading(false);

    // Check if the response is an error message
    if (result?.startsWith("Error:")) {
      // Display the error message
      model === "gemini-pro"
        ? setChat((prevChat) => [
            ...prevChat,
            { type: "response", content: `An error occurred, ${result}` },
          ])
        : setChat((prevChat) => [
            ...prevChat,
            { type: "response", content: `An error occurred, ${result}` , image: file },
          ]);
      return;
    }

    // Add the response to the chat
    model === "gemini-pro"
      ? setChat((prevChat) => [
          ...prevChat,
          { type: "response", content: result },
        ])
      : setChat((prevChat) => [
          ...prevChat,
          { type: "response", content: result, image: file },
        ]);
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

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          type="button"
          className="flex bg-[#96c0ff] hover:bg-[#75acff] text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaCameraRetro className="h-5 w-5" />
        </button>

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
