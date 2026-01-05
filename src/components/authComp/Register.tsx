"use client";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Input from "../input/Input";
import { lvl, sections, SelectSection } from "../selection/Selection";
import preview1 from "../../../public/images/2201_w020_n001_1251a_p30_1251.jpg";
type signUpProps = {
  className: string;
  toggle: () => void;
};
function SignUp({ toggle }: signUpProps): ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };
  return (
    <div className={`flex flex-col gap-13 mt-5 xl:items-start items-center`}>
      <Input inputType="text" label="Username" />
      <Input inputType="text" label="Email" />
      <Input inputType="password" label="Password" />
      <SelectSection values={sections} />
      <Input inputType="text" label="Skill" />
      <SelectSection values={lvl} />
      <div className="relative">
        <textarea
          placeholder=" "
          className="peer border border-gray-300 rounded-xl p-4 w-96 bg-transparent h-40 resize-none focus:outline-none focus:border-black focus:border-2"
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
      <div className="flex flex-col items-center gap-2">
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
          className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
        >
          Upload Photo
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-800 transition-colors duration-300 cursor-pointer"
      >
        Register
      </button>
    </div>
  );
}
export default SignUp;
