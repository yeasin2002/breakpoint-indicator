import reactLogo from "@/assets/react.svg";
import { useState } from "react";
import wxtLogo from "/wxt.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-320 mx-auto px-8 py-8 text-center">
      <div className="flex justify-center gap-4 mb-8">
        <a href="https://wxt.dev" target="_blank" className="group">
          <img
            src={wxtLogo}
            className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#54bc4ae0]"
            alt="WXT logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" className="group">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-spin animate-duration-20s"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-5xl leading-tight mb-8">WXT + React</h1>
      <div className="p-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-#1a1a1a cursor-pointer transition-border-color duration-250 hover:border-#646cff focus:outline-4 focus:outline-auto dark:bg-#1a1a1a light:bg-#f9f9f9"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit{" "}
          <code className="bg-#1e1e1e px-1 py-0.5 rounded">src/App.tsx</code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="text-#888">
        Click on the WXT and React logos to learn more
      </p>
    </div>
  );
}

export default App;
