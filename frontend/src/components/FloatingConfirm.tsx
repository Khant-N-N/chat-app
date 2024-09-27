import { useState } from "react";
import { baseUrl, getReq } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Floating {
  text: "Log out" | "Delete";
  isDisplayFloat: boolean;
  setIsDisplayFloat: (bool: boolean) => void;
}

const FloatingConfirm = ({
  text,
  isDisplayFloat,
  setIsDisplayFloat,
}: Floating) => {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      if (text === "Log out") {
        await getReq(`${baseUrl}/log-out`);
        setIsDisplayFloat(false);
        navigate("/log-in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        isDisplayFloat ? "scale-100" : "scale-0"
      } absolute top-0 z-50 w-full h-screen transition-all flex flex-col items-center justify-center`}
    >
      <div
        onClick={() => setIsDisplayFloat(false)}
        className="bg-primary/80 w-full h-full absolute -z-10 top-0"
      />
      <div className="text-white flex flex-col items-center justify-center gap-4 border rounded-md p-5 w-4/5 md:w-[500px] h-[300px]">
        <p className="mb-10 md:text-xl">Please confirm to {text}</p>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setIsDisplayFloat(false)}
            className="bg-secondary py-2 px-4 rounded-md hover:bg-secondary/70 select-none"
          >
            Cancel
          </button>
          <button
            onClick={onClick}
            className="bg-secondary p-2 px-4 rounded-md hover:bg-secondary/70 select-none"
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingConfirm;
