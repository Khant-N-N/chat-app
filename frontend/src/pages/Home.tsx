import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { baseUrl, getReq } from "../services/api";
import { setAuthenticatedUser } from "../features/userSlice";
import { UserModel } from "../models/userModel";

const Home = () => {
  const { logInUser } = useSelector((state: RootState) => state.user);
  console.log(logInUser);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const getAuthUser = async () => {
  //     const data: UserModel = await getReq(`${baseUrl}user`);
  //     dispatch(setAuthenticatedUser(data));
  //     console.log(logInUser);
  //   };
  //   getAuthUser();
  // }, [dispatch]);

  return <div className="text-red-500">home</div>;
};

export default Home;
