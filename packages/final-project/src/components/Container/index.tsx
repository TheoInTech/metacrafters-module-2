import classNames from "utils/helpers/classNames";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const defaultClassName =
  "relative w-full md:w-[600px] border-2 border-[#EFE7B2] h-full md:h-[500px] bg-[#06051c] rounded-2xl shadow-2xl opacity-100 p-4 md:p-16 m-4 md:m-0 bg-black flex gap-6 flex-col text-2xl items-center justify-start";

const Container = ({ children, ...props }: ContainerProps) => {
  const className = classNames(defaultClassName, props.className ?? "");

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Container;
