import React from 'react';

interface SearchProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange event type
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  return (
    <form className="w-48">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
        <input
          type="search"
          id="default-search"
          onChange={onChange} // Хайлтын утгыг parent компонент руу дамжуулах
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-green-500"
          placeholder={placeholder}
          required
        />
      </div>
    </form>
  );
};

export default Search;
