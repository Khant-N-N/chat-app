import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { logInUser } = useSelector((state: RootState) => state.user);
  return logInUser ? <Outlet /> : <Navigate to={"/log-in"} />;
};

export default ProtectedRoute;
