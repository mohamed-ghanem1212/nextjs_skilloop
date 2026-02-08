import { ListViewIcon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/Skilloop logo.svg";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { toast } from "sonner";
import { createUserApi } from "@/lib/user.axios";
type NavResProps = {
  isOpen: boolean;
  setIsOpened: (open: boolean) => void;
};
function NavBar({ isOpen, setIsOpened }: NavResProps) {
  const { user, setUser } = useAuth();
  const handleLogOutUser = async () => {
    try {
      if (!user) {
        return;
      }
      const res = await createUserApi.post("/logOut");
      console.log(res.data);

      setUser(null);
      toast.success(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);
        toast.success(err.response?.data.message);
      } else {
        console.log("UNEXPECTED:", err);
      }
    }
  };
  return (
    <nav className="flex flex-row mx-6 md:mx-15 gap-9 items-center justify-between mb-3">
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-col items-center cursor-pointer justify-center my-2">
          <Link href={"home"}>
            <Image
              src={logo}
              alt=""
              className="object-cover"
              width={120}
              height={120}
            />
          </Link>
        </div>
        <div className="xl:flex flex-row gap-9 text-xl text-center hidden">
          <Link href={"/home"} className="hover:text-blue-700 duration-200">
            Home
          </Link>
          <Link href={"/discover"} className="hover:text-blue-700 duration-200">
            Discover
          </Link>
          <Link href={"/about"} className="hover:text-blue-700 duration-200">
            About Us
          </Link>
          <Link href={"/contact"} className="hover:text-blue-700 duration-200">
            Contact
          </Link>
          <Link
            href={"/chat"}
            className={`hover:text-blue-700 duration-200 ${user ? "block" : "hidden"}`}
          >
            Chat Room
          </Link>
        </div>
      </div>
      <div
        className="rounded-full hover:bg-gray-200 duration-150 w-13 h-13 flex items-center justify-center cursor-pointer xl:hidden"
        onClick={() => setIsOpened(true)}
      >
        <ListViewIcon className="" />
      </div>
      <div className="xl:flex flex-row gap-9 text-xl text-center hidden">
        <Link
          href={"/profile"}
          className={`hover:text-blue-700 duration-200 ${user ? "block" : "hidden"}`}
        >
          User Profile
        </Link>
        <Link
          onClick={handleLogOutUser}
          href={"/auth"}
          className={`hover:text-blue-700 duration-200`}
        >
          {user ? "Log out" : "Register"}
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
