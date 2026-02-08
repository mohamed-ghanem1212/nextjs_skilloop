"use client";
import Image from "next/image";
import { ChangeEvent, ReactNode, useState } from "react";
import Input from "../input/Input";
import { lvl, sections, SelectSection } from "../selection/Selection";
import axios, { AxiosError } from "axios";
import preview1 from "../../../public/images/2201_w020_n001_1251a_p30_1251.jpg";
import { User } from "../../types.entities/user.types";
import { useRouter } from "next/navigation";
import { createUserApi } from "@/lib/user.axios";
import { useAuth } from "@/context/authContext";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
type signUpProps = {
  className: string;
  toggle: () => void;
};
function SignUp({ toggle }: signUpProps): ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { user, setUser, refreshUser } = useAuth();
  const router = useRouter();
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("please upload your picture");
    const formData = new FormData();
    formData.append("username", user?.username!);
    formData.append("email", user?.email!);
    formData.append("title", user?.title!);
    formData.append("password", user?.password!);
    formData.append("bio", user?.bio!);
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const res = await createUserApi.post("/newUser", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser({
        ...user!,
        profilePicture: res.data.profilePicture,
      });
      await refreshUser();
      toast.success(res.data.message);
      setLoading(false);
      router.back();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.error(
          err.response?.data.message ||
            "Failed to register, please try again later",
        );
        console.log("HEADERS:", err.response?.headers);
      } else {
        console.log("UNEXPECTED:", err);
        toast.error("Something went wrong please try again later");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const maxSizeMB = 10;
    if (selectedFile.size / 1024 / 1024 > maxSizeMB) {
      toast.error("File too large");
      return;
    }
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className={`flex flex-col gap-13 mt-5 xl:items-center items-center`}>
      <Input
        inputType="text"
        label="Username"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUser({ ...user!, username: e.target.value })
        }
      />
      <Input
        inputType="text"
        label="Email"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUser({ ...user!, email: e.target.value })
        }
      />
      <Input
        inputType="text"
        label="Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUser({ ...user!, title: e.target.value })
        }
      />
      <Input
        inputType="password"
        label="Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUser({ ...user!, password: e.target.value })
        }
      />
      <div className="relative">
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setUser({ ...user!, bio: e.target.value })
          }
          placeholder=" "
          className="peer border border-gray-300 rounded-xl p-4 w-80 md:w-96 bg-transparent h-40 resize-none focus:outline-none focus:border-black focus:border-2"
        ></textarea>
        <label
          htmlFor=""
          className="absolute top-4 left-7 text-gray-400
              peer-focus:-top-7 peer-focus:left-3 peer-focus:text-sm peer-focus:text-black duration-200 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:-top-7 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black peer-not-placeholder-shown:translate-y-0"
        >
          Bio
        </label>
      </div>
      <p>
        already have an account?{" "}
        <a
          className="hover:underline hover:text-blue-700 cursor-pointer"
          onClick={() => toggle()}
        >
          Sign in
        </a>
      </p>
      <div className="flex flex-row items-center gap-2">
        <Image
          width={200}
          height={200}
          src={preview ?? preview1}
          alt="Preview"
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="upload"
          className="bg-gray-300 text-white px-4 py-2 rounded-4xl cursor-pointer hover:bg-blue-500 duration-150"
        >
          Upload Photo
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-800 transition-colors duration-300 cursor-pointer text-center"
        onClick={handleCreateUser}
      >
        {loading ? <Spinner className="w-full" /> : "Register"}
      </button>
    </div>
  );
}
export default SignUp;
