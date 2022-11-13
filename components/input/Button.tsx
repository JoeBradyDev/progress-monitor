import { FC } from "react";

interface IButton {
  color?: "green" | "blue" | undefined;
  children?: any;
  isCircle?: boolean;
  name?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  value?: string;
}

const Button: FC<IButton> = (props) => {
  const {
    children,
    color: selectedColor,
    isCircle = false,
    name,
    onClick: handleClick,
    type = "button",
    value,
    ...rest
  } = props;
  const color =
    type === "submit" || selectedColor === "green"
      ? "border-green-600 bg-green-500 hover:bg-green-600"
      : "border-blue-600 bg-blue-500 hover:bg-blue-600";

  const shape = isCircle ? "rounded-full" : "rounded-lg";
  const padding = isCircle ? "p-4" : "px-3 py-2";

  return (
    <button
      className={`inline-block border font-medium text-white shadow-md ${color} ${padding} ${shape}`}
      name={name}
      onClick={handleClick}
      type={type}
      value={value}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
