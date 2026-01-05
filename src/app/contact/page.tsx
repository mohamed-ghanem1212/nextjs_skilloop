import { ReactNode } from "react";
import Image from "next/image";
import contactUs from "../../../public/images/9963615.jpg";
import Input from "@/components/input/Input";
function Contact(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col xl:flex-row justify-between w-full px-32 py-14 items-center">
        <div className="flex flex-col w-110 xl:w-100 py-16 items-center xl:items-start">
          <h1 className="text-7xl font-bold mb-6">Talk to Us!</h1>

          <p className="text-xl text-center xl:text-start leading-relaxed tracking-wide">
            We help your business grow with smart digital marketing. Let’s chat
            and explore how we can turn your goals into real success.
          </p>
        </div>
        <div>
          <Image src={contactUs} alt="Contact Us" width={700} height={700} />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row w-full px-32 py-3 justify-between items-center">
        <div className="flex flex-col gap-14">
          <h2 className="text-4xl font-bold">Write a message</h2>
          <div>
            <form className="flex flex-col gap-11 mt-6 items-center">
              <Input label="Your Name" inputType="text" />
              <Input label="Your Email" inputType="email" />
              <Input label="Subject" inputType="text" />
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
                  Your Message(optional)
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-800 transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col py-13">
          <div className="flex flex-col py-16 justify-between">
            <h1 className="text-3xl font-bold mb-6">Prefer email?</h1>

            <p className="text-xl leading-relaxed tracking-wide">
              We are here for you in
              <br /> every way possible.
              <br /> Please write directly to
              <br /> hi(at)solarone(dot)com and we
              <br /> get back to you within one
              <br /> business day.
            </p>
          </div>
          <div className="flex flex-col w-full py-13  justify-between">
            <h1 className="text-3xl font-bold mb-6">Our Office</h1>

            <p className="text-lg leading-relaxed tracking-wide">
              456 Maple Avenue Suite 908,
              <br /> Downtown West Toronto, Ontario,
              <br /> Canada Phone +1 647 892 1045
              <br /> We are here for you in every way possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
