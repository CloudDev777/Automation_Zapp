import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import customFetch from "./utils/fetch";
import { Button } from "./components/ui/button";

function App() {
  function handleClick() {
    async function login() {
      try {
        await customFetch.post("/auth/login", {
          email: "meer.uxair007@gmail.com",
          password: "144315_Khair.",
        });
        console.log("Login Successful");
      } catch (error: any) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    login();
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => handleClick()}>count is count</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button>Click me</Button>
    </>
  );
}

export default App;
