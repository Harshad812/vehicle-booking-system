import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "../pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Catch-all for 404 pages */}
      <Route path="*" element={<h1>Not Found</h1>} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
};
