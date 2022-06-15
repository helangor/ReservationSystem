import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Products } from "./components/products/products";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Products />
    </div>
  );
}

export default App;
