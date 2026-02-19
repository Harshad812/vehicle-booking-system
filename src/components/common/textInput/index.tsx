import type { FC, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput: FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{label}</label>
      <input
        type="text"
        className=" p-1 outline-none bg-white rounded-lg"
        {...props}
      />
    </div>
  );
};
