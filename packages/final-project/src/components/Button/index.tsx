/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "utils/helpers/classNames";

type ButtonVariant = "primary" | "outline";

const getVariantSpecificButtonProps = (
  variant: ButtonVariant
): React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> => {
  switch (variant) {
    case "outline":
      return {
        className:
          "bg-transparent border-2 border-solid border-white hover:bg-gray-100 hover:bg-opacity-5",
      };

    case "primary":
    default:
      return {
        className:
          "bg-gradient-to-r from-indigo-900 via-purple-500 via-purple-700 to-pink-900",
      };
  }
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariant;
  children?: React.ReactNode;
}

const defaultClassName =
  "inline-block flex items-center justify-center rounded-full text-base py-4 px-8 text-xl hover:brightness-110 text-white disabled:cursor-no-drop font-semibold";

const Button = ({ children, variant = "primary", disabled = false, ...props }: ButtonProps) => {
  const variantProps = getVariantSpecificButtonProps(variant);
  const className = classNames(
    defaultClassName,
    disabled ? "bg-gray-400" : (variantProps.className ?? ""),
    props.className ?? ""
  );
  return (
    <button {...props} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
