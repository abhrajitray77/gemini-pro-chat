import { useContext } from "react";
import { ModelContext } from "../utils/ModelProvider";

const ModelSelector = () => {
  const { model, setModel } = useContext(ModelContext);
  return (
    <div className="flex justify-center gap-2">
      <button
        className={`${
          model === "gemini-pro"
            ? "bg-[#428eff] text-white"
            : "bg-white text-neutral-400"
        } px-4 py-2 rounded-md transition duration-300`}
        onClick={() => setModel("gemini-pro")}
      >
        Gemini Pro
      </button>
      <button
        className={`${
          model === "gemini-pro-vision"
            ? "bg-[#428eff] text-white"
            : "bg-white text-neutral-400"
        } px-4 py-2 rounded-md transition duration-300`}
        onClick={() => setModel("gemini-pro-vision")}
      >
        Gemini Pro Vision
      </button>
    </div>
  );
};

export default ModelSelector;
