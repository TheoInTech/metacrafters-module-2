import classNames from "utils/helpers/classNames";

interface IBadge {
  title: string;
  description?: string;
  color?: BadgeColor;
  className?: string;
}

type BadgeColor = "blue" | "purple" | "gold" | "gray";

const getColorBadgeProps = (
  color: BadgeColor
) => {
  switch (color) {
    case "gold":
      return {
        className: "bg-[#f7c852] text-black",
      };

      case "purple":
      return {
        className: "bg-[#a051f5] text-white",
      };

    case "gray":
      return {
        className: "bg-[#f0eded] text-black",
      };

    case "blue":
    default:
      return {
        className:
          "bg-[#5783eb] text-white",
      };
  }
};

const defaultClassName =
  "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mx-1"

const Badge = ({ title, description, color = 'blue', className: argClassName}: IBadge) => {
  const colorProps = getColorBadgeProps(color);
  const className = classNames(
    defaultClassName,
    colorProps.className ?? "",
    argClassName ?? ""
  );
  
  return (
    <span
      className={className}
    >
      <span className="font-bold ">{title}</span>{' '}
      {description && <span className="px-2 ml-2 font-normal text-center border-l-[1px] border-solid border-l-[#999]">{description}</span>}
    </span>
  );
};

export default Badge;
