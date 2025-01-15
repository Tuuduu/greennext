import React from "react";

interface SearchProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void; // Хайлтын утгыг буцаах функц
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value.trim()); // Хайлтын утгыг parent компонент руу дамжуулах
  };

  return (
    <form className="w-full sm:w-64">
      <div className="relative">
        {/* Хайх икон */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
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
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default Search;
