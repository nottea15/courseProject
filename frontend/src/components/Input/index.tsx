// React Libraries & Dependencies
import React, { useState, FC } from "react";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeClosed } from "../../assets/icons/eyeClosed.svg";
import { ReactComponent as Error } from "../../assets/icons/error.svg";

interface IInputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const Input: FC<IInputProps> = ({
  value,
  onChange,
  isPassword = false,
  icon,
  placeholder,
  isError = false,
  errorMessage
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <div
      className={`flex items-center px-5 py-3 mt-6 w-full rounded-full h-[55px] bg-gray 
      ${isError ? "bg-background border-red border" : ""}`}
    >
      {icon && icon}
      <div className="pl-3 w-4/5">
        {isFocused || value ? (
          <p className="text-xs font-bold text-gray2">{placeholder}</p>
        ) : null}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          className={`w-full font-normal text-sm bg-gray focus:outline-none focus:font-semibold ${
            value && "font-semibold"
          } ${isError && "bg-background"}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : placeholder}
        />
      </div>
      {isPassword && (
        <button
          className="ml-auto"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Eye color="#BDBDBD" />
          ) : (
            <EyeClosed color="#BDBDBD" />
          )}
        </button>
      )}
    </div>
    {errorMessage && <div className="flex"><Error className="text-red"/> <p className="text-red text-xs font-medium w-full">{errorMessage}</p></div>}
    </>
  );
};
