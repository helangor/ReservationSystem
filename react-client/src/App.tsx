import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Products } from "./components/products/products";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import { ProductDetail } from "./components/products/productDetail";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/palju/:productName" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
