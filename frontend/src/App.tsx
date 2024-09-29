import { lazy, Suspense } from "react";
import HomeDashboard from "./pages/HomeDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

const LogIn = lazy(() => import("./pages/LogIn"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
