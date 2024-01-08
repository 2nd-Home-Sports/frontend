"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { TfiArrowCircleRight } from "react-icons/tfi";

interface IDropDownProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const DropDown: React.FC<IDropDownProps> = ({ className, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={clsx(
        className,
        "w-full mx-20 md:w-[350px] bg-[#063059] rounded-md"
      )}
    >
      <button
        className="w-full bg-white px-[20px] md:px-[50px] py-4 rounded-md"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center justify-center w-full text-[#61646B] text-[20px] md:text-[24px] leading-6">
          <div>{label}</div>
          <div className={`ml-4 ${isOpen ? "rotate-90" : ""}`}>
            <TfiArrowCircleRight />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="w-full px-2 py-4 text-[24px] md:text-[18px] ">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropDown;
