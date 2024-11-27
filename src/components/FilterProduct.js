import { useState } from "react";

const FilterProduct = ({ onFilterChange, placeholder = 'Buscar...' }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value)
        onFilterChange(value)
    }

    return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    )
}

export default FilterProduct;