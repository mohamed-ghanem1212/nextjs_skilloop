import { ReactNode, ChangeEvent } from "react";
type inputProps = {
  label: string;
  inputType: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
function Input({ label, inputType, onChange }: inputProps): ReactNode {
  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder=" "
        className="peer w-80 md:w-96 rounded-xl border border-gray-300 bg-transparent focus:border-black focus:border-2 p-4
             placeholder-opacity-0
             focus:outline-none"
        onChange={onChange}
      />
      <label
        className="absolute left-7 top-1/2 -translate-y-1/2
             text-gray-400 transition-all duration-200 pointer-events-none

             peer-focus:-top-7
             peer-focus:left-3
              peer-focus:text-sm peer-focus:text-black
             peer-focus:translate-y-0

             peer-not-placeholder-shown:-top-7
             peer-not-placeholder-shown:left-3
             peer-not-placeholder-shown:text-sm
             peer-not-placeholder-shown:text-black
             peer-not-placeholder-shown:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
export default Input;
