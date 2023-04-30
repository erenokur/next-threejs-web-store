import React, { useState, useEffect, useRef } from "react";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";

interface Option {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-white font-bold"
        onClick={handleToggle}
      >
        <FaUserAlt className="mr-2" />
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map(
              (
                { label, onClick },
                index // use destructuring to get label and onClick from each option object
              ) => (
                <button // Use any HTML element of your choice
                  key={index}
                  className="block w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={onClick}
                  role="menuitem"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
