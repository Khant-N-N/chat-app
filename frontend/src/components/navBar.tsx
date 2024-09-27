import { FaUser } from "react-icons/fa6";

interface navbar {
  setIsDisplayFloat: (bool: boolean) => void;
  setFloaterText: (txt: "Log out") => void;
}
const NavBar = ({ setIsDisplayFloat, setFloaterText }: navbar) => {
  return (
    <nav className="fixed top-0 w-full z-50 px-10 py-3 text-[.8rem] md:text-[1rem] text-white flex justify-between items-center gap-5 bg-primary border-b-2">
      <div className="font-rice text-2xl">ChatBud</div>
      <div className="flex gap-5">
        <FaUser className="text-secondary cursor-pointer text-4xl border rounded-full hover:text-secondary/70" />
        <button
          onClick={() => {
            setIsDisplayFloat(true);
            setFloaterText("Log out");
          }}
          className="bg-secondary p-2 rounded-md hover:bg-secondary/70 select-none"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
