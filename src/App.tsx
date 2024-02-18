import ChatEnlosure from "./components/ChatEnlosure";
import ModelSelector from "./components/ModelSelector";

function App() {
  return (
    <>
      <main className="pt-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-3xl uppercase font-extrabold text-neutral-700">Gemini Chat </h1>
          <ModelSelector />
        </div>
        <div className="p-4 md:p-6 w-full md:max-w-[50rem] lg:max-w-[70rem] mx-auto">
          <ChatEnlosure />
        </div>
{/* 
        <footer>

        </footer> */}
      </main>
    </>
  );
}

export default App;
