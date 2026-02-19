import { Eye, EyeOff } from "lucide-react";
import { useState, type FC, type InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  isPassword?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  className,
  isPassword,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <div className="relative">
        <input
          className={`p-1 outline-none bg-white rounded-lg w-full ${className}`}
          {...props}
          type={showPassword ? "text" : type}
        />
        {isPassword && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {!showPassword ? (
              <EyeOff height={18} width={18} onClick={togglePassword} />
            ) : (
              <Eye height={18} width={18} onClick={togglePassword} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
