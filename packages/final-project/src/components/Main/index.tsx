import classNames from "utils/helpers/classNames";

interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

const defaultClassName =
  "w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#1E1D2F] to-[#0a0a12] text-white";

const Main = ({ children, ...props }: MainProps) => {
  const className = classNames(defaultClassName, props.className ?? "");

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Main;
