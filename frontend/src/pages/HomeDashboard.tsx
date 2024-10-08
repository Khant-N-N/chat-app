import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { baseUrl, getReq } from "../services/api";
import { setAuthenticatedUser } from "../features/userSlice";
import { UserModel } from "../models/userModel";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import FloatingConfirm from "../components/FloatingConfirm";
import MainLeft from "../components/MainLeft";
import MainRight from "../components/MainRight";

const HomeDashboard = () => {
  const [isDisplayFloat, setIsDisplayFloat] = useState(false);
  const [floaterText, setFloaterText] = useState<"Log out" | "Delete">(
    "Log out"
  );
  const { logInUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const data: UserModel = await getReq(`${baseUrl}/user`);
        dispatch(setAuthenticatedUser(data));
      } catch (err) {
        if (isAxiosError(err)) {
          dispatch(setAuthenticatedUser(null));
          err.response?.status === 401 && navigate("/log-in");
        }
      }
    };
    getAuthUser();
  }, [dispatch, navigate]);

  return (
    <>
      <NavBar
        setIsDisplayFloat={setIsDisplayFloat}
        setFloaterText={setFloaterText}
      />
      <FloatingConfirm
        text={floaterText}
        isDisplayFloat={isDisplayFloat}
        setIsDisplayFloat={setIsDisplayFloat}
      />
      <main className="bg-primary w-full h-screen pt-20 flex px-10 text-white">
        <MainLeft />
        <MainRight />
      </main>
    </>
  );
};

export default HomeDashboard;
