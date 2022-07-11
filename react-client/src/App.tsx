import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Products } from "./components/products/products";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProductDetail } from "./components/products/productDetail";
import CompanyControlPanel from "./components/companyControlPanel/companyControlPanel";
import authService from "./services/auth.service";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/palju/:productName" element={<ProductDetail />} />
        <Route
          path="/yritykseni"
          element={
            <RequireAuth>
              <CompanyControlPanel />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!authService.isLoggedIn()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
