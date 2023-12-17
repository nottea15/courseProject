import { FC } from "react";

interface IProps {
  type: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  text: string;
  size: string;
}
export const Button: FC<IProps> = ({ type, disabled, onClick, text, size }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${size} px-6 py-4 bg-lime-400 rounded-full justify-center items-center gap-1 inline-flex cursor-pointer ${
        type === "secondary"
          ? "border-[1.5px] border-black bg-white hover:bg-line disabled:hover:bg-background"
          : "bg-main hover:bg-active hover:opacity-100 disabled:hover:bg-main"
      } disabled:opacity-30 disabled:cursor-default`}
    >
      <div className="text-center text-slate-500 text-base font-bold ">{text}</div>
    </button>
  );
};
