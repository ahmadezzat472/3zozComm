import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import About from "../components/About";
import Home from "../components/Home";
import Cart from "../components/cart/index";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
