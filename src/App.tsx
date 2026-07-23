import reactLogo from "./assets/logo.svg";
import "./App.css";
import MyTest from "./components/MyTest";

function App() {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React + TypeScript</h1>
      <div className="card underline">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Rspack and React logos to learn more</p>
      <MyTest />
    </div>
  );
}

export default App;
