import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Cafeteria from "../pages/Cafeteria";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRouter;
