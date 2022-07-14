import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Products } from "./components/products/products";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProductDetail } from "./components/products/productDetail";
import authService from "./services/auth.service";
import { Companies } from "./components/companies/companies";
import { CompanyEdit } from "./components/companies/companyEdit/companyEdit";

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
              <Companies />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/muokkaa/:id"
          element={
            <RequireAuth>
              <CompanyEdit />
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
