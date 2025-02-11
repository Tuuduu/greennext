import React from "react";
import anime from "animejs";

interface SearchProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void; // Хайлтын утгыг parent компонент руу дамжуулах
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value.trim()); // Хайлтын утгыг parent компонент руу дамжуулах
  };

  const animateIcon = (icon: SVGSVGElement) => {
    anime({
      targets: icon,
      scale: [1, 1.2, 1],
      duration: 400,
      easing: "easeInOutQuad",
    });
  };

  return (
    <form className="w-full sm:w-64">
      <div
        className="relative group"
        onMouseEnter={(e) => {
          const icon = e.currentTarget.querySelector("svg");
          if (icon) animateIcon(icon);
        }}
      >
        {/* Хайх икон */}
        <div className="absolute inset-y-0 left-3 flex items-center">
          <svg
            className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors duration-150"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        {/* Хайх оролт */}
        <input
          type="search"
          onChange={handleInputChange} // Хайлтын функц
          className="block w-full p-2 pl-10 text-sm text-gray-900 border placeholder:text-[12px] 2xl:placeholder:text-md border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out group-hover:border-gray-400 dark:group-hover:border-gray-500"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default Search;
