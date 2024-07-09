import { isAxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, postReq } from "../services/api";
import { useDispatch } from "react-redux";
import { setAuthenticatedUser } from "../features/userSlice";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = baseUrl + "/register";
      const body = { ...FormData };
      const data = await postReq({ url, body });
      dispatch(setAuthenticatedUser(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error);
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-screen flex-col bg-primary text-white gap-3"
    >
      <p className="text-secondary text-[21px]">Create an Account</p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div>
        <p>Email :</p>
        <input
          value={FormData.email}
          onChange={handleChange}
          className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
        />
      </div>

      <div>
        <p>Username :</p>
        <input
          value={FormData.username}
          onChange={handleChange}
          className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Username"
        />
      </div>

      <div>
        <p>Password :</p>
        <input
          value={FormData.password}
          onChange={handleChange}
          className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="border-none bg-secondary focus:outline-secondary rounded-xl py-3 my-4 w-[20rem] hover:opacity-65"
      >
        Register
      </button>
      <p className="w-[20rem]">
        Already had an account?{" "}
        <Link
          to="/log-in"
          className="text-secondary underline hover:opacity-65 cursor-pointer"
        >
          Log In
        </Link>
      </p>
    </form>
  );
};

export default Register;
