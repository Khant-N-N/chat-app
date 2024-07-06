import { useState, lazy, Suspense } from "react";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";

const LogIn = lazy(() => import("./pages/LogIn"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;
