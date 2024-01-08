import React from "react";
import { FaCircleChevronRight } from "react-icons/fa6";

interface IProps {
  variant: "primary" | "secondary";
  direction: "next" | "prev";
  mobilePos: "hidden" | "show" | "bottom";
  onClick: () => void;
}

const SlideButton: React.FC<IProps> = ({
  variant,
  direction,
  mobilePos,
  onClick,
}) => {
  const directionClass = { next: "", prev: "rotate-180" };
  const backgroundClass = {
    primary: "bg-deal_blue-100",
    secondary: "bg-white",
  };
  const mobilePlacementClass = {
    hidden: `${
      direction == "next" ? "-right-6" : "-left-6"
    } top-[50%] translate-y-[-50%] hidden md:block`,
    show: `${
      direction == "next" ? "-right-3 md:-right-6" : "-left-3 md:-left-6"
    } top-[50%] translate-y-[-50%]`,
    bottom: `top-[110%] md:top-[45%] md:translate-y-[50%] ${
      direction == "next"
        ? "right-[50%] translate-x-[150%] md:-right-6 md:translate-x-0"
        : "left-[50%] translate-x-[-150%] md:-left-6 md:translate-x-0"
    }`,
  };

  return (
    <div
      className={`absolute z-10 ${mobilePlacementClass[mobilePos]} text-white`}
    >
      <div className="relative">
        <div
          onClick={() => {
            onClick();
          }}
          className={`flex items-center justify-center ${directionClass[direction]} w-10 h-10 align-middle rounded-full hover:cursor-pointer ${backgroundClass[variant]}`}
        >
          <div className="fill-deal_blue-500">
            <FaCircleChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideButton;
