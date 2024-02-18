import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatEnlosure = () => {
  return (
    <div className="max-w-5xl p-4 md:p-6 lg:p-10 border-4 rounded-3xl space-y-4">
      {/* chat area */}
      <div>
        <Chat />
      </div>
      {/* chat input */}
      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatEnlosure;
