import * as React from "react";

type ColorType =
  | "teal"
  | "gray"
  | "darkGray"
  | "lightGray"
  | "transparent"
  | "red";
type ButtonSize = "medium" | "large";

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  color?: ColorType;
  inline?: boolean;
  size?: ButtonSize;
  responsive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  ref,
  color = "teal",
  inline,
  size = "medium",
  responsive = false,
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <button
      color={color}
      inline={inline}
      size={size}
      responsive={responsive}
      {...htmlProps}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
