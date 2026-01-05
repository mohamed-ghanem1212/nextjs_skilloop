import { ListViewIcon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/255893252_d184c32b-9410-4627-881c-e3db80456315.svg";
type NavResProps = {
  isOpen: boolean;
  setIsOpened: (open: boolean) => void;
};
function NavBar({ isOpen, setIsOpened }: NavResProps) {
  return (
    <nav className="flex flex-row mx-6 md:mx-15 gap-9 items-center justify-between">
      <div className="flex flex-row items-center cursor-pointer">
        <Link href={"home"}>
          <Image
            src={logo}
            alt=""
            className="object-cover"
            width={140}
            height={140}
          />
        </Link>
        <h3 className="text-2xl font-bold">Skilloop</h3>
      </div>
      <div
        className="rounded-full hover:bg-gray-200 duration-150 w-13 h-13 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpened(true)}
      >
        <ListViewIcon className="md:hidden" />
      </div>
      <div className="md:flex flex-row gap-9 text-xl text-center hidden">
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
        <Link href={"/auth"} className="hover:text-blue-700 duration-200">
          Register
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
