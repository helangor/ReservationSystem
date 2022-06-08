import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Products } from "./components/products/product";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <Products />
        <p>Test</p>
        <h1>test</h1>
      </header>
    </div>
  );
}

export default App;
