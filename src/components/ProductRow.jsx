const ProductRow = ({ product, addToCart, columnOrder }) => {
  const renderCell = (colId) => {
    switch (colId) {
      case 'id':
        return <span className="text-gray-700 font-medium">{product.id}</span>;

      case 'image':
        return (
          <div className="w-10 h-10">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover rounded shadow-sm border border-gray-200"
            />
          </div>
        );

      case 'title':
        return <span className="text-gray-900 font-semibold">{product.title}</span>;

      case 'category':
        return <span className="text-gray-600 capitalize">{product.category}</span>;

      case 'price':
        return <span className="text-green-600 font-medium">${product.price}</span>;

      case 'stock':
        return <span className="text-gray-700">{product.stock}</span>;

      case 'status':
        return (
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        );

      case 'actions':
        return (
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition duration-150"
          >
            Add to Cart
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      {columnOrder.map((col) => (
        <td key={col.id} className="p-4 align-middle whitespace-nowrap">
          {renderCell(col.id)}
        </td>
      ))}
    </tr>
  );
};

export default ProductRow;
