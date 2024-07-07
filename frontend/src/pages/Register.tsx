import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-primary text-white gap-3">
      <p className="text-secondary text-[21px]">Create an Account</p>

      <div>
        <p>Email :</p>
        <input
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
          className="border-none text-primary focus:outline-secondary rounded-xl p-3 w-[20rem]"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <button
        type="button"
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
    </div>
  );
};

export default Register;
