import { ReactNode } from "react";
import Input from "../input/Input";
type LoginProps = {
  toggle: () => void;
};
function Login({ toggle }: LoginProps): ReactNode {
  return (
    <div className={`flex flex-col xl:items-start items-center gap-13 mt-5 `}>
      <Input inputType="text" label="Email" />
      <Input inputType="password" label="Password" />

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
        type="submit"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-800 transition-colors duration-300 cursor-pointer"
      >
        Login
      </button>
    </div>
  );
}
export default Login;
