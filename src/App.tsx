import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Contacts from "./pages/Contacts/Contacts";
import ProductDetails from "./components/Products/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
