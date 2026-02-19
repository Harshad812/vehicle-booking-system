import type { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
}

export const Select: FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <select
        className="p-2 outline-none bg-white rounded-lg border border-gray-200"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
