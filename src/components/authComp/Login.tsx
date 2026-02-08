"use client";
import { ChangeEvent, ReactNode, useState } from "react";
import Input from "../input/Input";
import { createUserApi } from "@/lib/user.axios";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "../../types.entities/user.types";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
type LoginProps = {
  toggle: () => void;
};
function Login({ toggle }: LoginProps): ReactNode {
  const { user, setUser, refreshUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleVerifyUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createUserApi.post("/signIn", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Profile updated:", res.data);
      setUser({
        ...user!,
      });
      toast.success(res.data.message);
      await refreshUser();
      setLoading(false);
      router.push("/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.error(
          err.response?.data.message ||
            "Failed to log in, please try again later",
        );
        console.log("HEADERS:", err.response?.headers);
      } else {
        toast.error("Something went wrong please try again later");
        console.log("UNEXPECTED:", err);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`flex flex-col xl:items-start items-center gap-13 mt-5`}>
      <Input
        inputType="text"
        label="Email"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <Input
        inputType="password"
        label="Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <p>
        Don't have an account?{" "}
        <a
          className="hover:underline hover:text-blue-700 cursor-pointer"
          onClick={() => toggle()}
        >
          Sign up
        </a>
      </p>
      <button
        onClick={handleVerifyUser}
        type="submit"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-800 transition-colors duration-300 cursor-pointer text-center"
      >
        {loading ? <Spinner className="w-full" /> : "Login"}
      </button>
    </div>
  );
}
export default Login;
