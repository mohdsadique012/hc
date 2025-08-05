import React from 'react';

const SearchFilter = ({ search, setSearch, category, setCategory, sortBy, setSortBy, categories }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 shadow-md border border-red-100 rounded-md">
      {/* Search Input */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Search by Name</label>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Enter product name..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

 
      <div className="flex flex-row sm:flex-row gap-4 w-full md:w-1/2">
        {/* Category Dropdown */}
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select option</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
