import React, { useContext, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';

const StatsCards = () => {
  const { state } = useContext(ProductContext);
  const { products } = state;

  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const lowStock = products.filter(p => p.stock < 5).length;
  const categories = new Set(products.map(p => p.category));

  const stats = useMemo(() => ([
    { label: 'Total Products', value: totalProducts },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
    { label: 'Low Stock Items', value: lowStock },
    { label: 'Categories Count', value: categories.size },
  ]), [totalProducts, totalRevenue, lowStock, categories]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-red-100 p-4 shadow rounded">
          <h4 className="text-sm text-gray-600">{stat.label}</h4>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
