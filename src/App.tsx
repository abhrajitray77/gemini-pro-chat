import ChatEnlosure from "./components/ChatEnlosure";

function App() {
  return (
    <>
      <main className="pt-6">
        <div className="flex justify-center">
          <h1 className="text-3xl uppercase font-extrabold text-neutral-700">Gemini Chat </h1>
        </div>
        <div className="p-4 md:p-6 lg:p-10 w-full md:max-w-[50rem] lg:max-w-[70rem] mx-auto">
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
