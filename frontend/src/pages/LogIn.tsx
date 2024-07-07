import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, postReq } from "../services/api";
import { useDispatch } from "react-redux";
import { setAuthenticatedUser } from "../features/userSlice";
import { isAxiosError } from "axios";

const LogIn = () => {
  const [emailLogIn, setEmailLogIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = baseUrl + "log-in";
      let body;
      if (emailLogIn) {
        body = {
          email: formData.email,
          password: formData.password,
        };
      } else {
        body = {
          username: formData.username,
          password: formData.password,
        };
      }
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <p
        className="cursor-pointer hover:opacity-70 text-secondary text-[15px]"
        onClick={() => setEmailLogIn(!emailLogIn)}
      >
        {">>"}Log in with {emailLogIn ? "Username" : "Email"}
      </p>
      {emailLogIn ? (
        <div>
          <p>Email :</p>
          <input
            value={formData.email}
            onChange={handleChange}
            className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
      ) : (
        <div>
          <p>Username :</p>
          <input
            value={formData.username}
            onChange={handleChange}
            className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
            type="text"
            name="username"
            id="username"
            placeholder="Enter Your Username"
          />
        </div>
      )}
      <div>
        <p>Password :</p>
        <input
          value={formData.password}
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
        Log In
      </button>
      <p className="w-[20rem]">
        New to ChatBud?{" "}
        <Link
          to="/register"
          className="text-secondary underline hover:opacity-65 cursor-pointer"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LogIn;
