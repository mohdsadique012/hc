const ShimmerRow = () => {
 const columnsCount = 8; // fixed column count

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="animate-pulse bg-gray-100">
            {Array.from({ length: columnsCount }).map((_, i) => (
              <th key={i} className="p-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <tr key={rowIndex} className="animate-pulse border-t border-gray-200">
              {Array.from({ length: columnsCount }).map((_, colIndex) => (
                <td key={colIndex} className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ShimmerRow