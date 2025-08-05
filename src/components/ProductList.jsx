import React, { useContext, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductRow from './ProductRow';
import SearchFilter from './SearchFilter';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ShimmerRow from './ShimmerRow';

const defaultColumns = [
  { id: 'id', label: 'ID' },
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Name' },
  { id: 'category', label: 'Category' },
  { id: 'price', label: 'Price' },
  { id: 'stock', label: 'Stock' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const SortableHeader = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <th ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-3 text-left bg-gray-100">
      {label}
    </th>
  );
};

const ProductList = () => {
  const { state, addToCart } = useContext(ProductContext);
  const { products, loading, error } = state;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);

  const [columns, setColumns] = useState(defaultColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(col => col.id === active.id);
      const newIndex = columns.findIndex(col => col.id === over?.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category).filter(Boolean))];
    return unique;
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      result = result.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));
   console.log(search,result)
    }
    if (category !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (sortBy) {
      result.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
      });
    }
    return result;
  }, [products, search, category, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * 10;
    return filtered.slice(start, start + 10);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / 10);

if (loading) return <ShimmerRow />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      <div className="overflow-x-auto mt-6 rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={columns.map(col => col.id)} strategy={verticalListSortingStrategy}>
                <tr>
                  {columns.map(col => (
                    <SortableHeader key={col.id} id={col.id} label={col.label} />
                  ))}
                </tr>
              </SortableContext>
            </DndContext>
          </thead>
          <tbody>
            {paginated.map(product => (
              <ProductRow key={product.id} product={product} addToCart={addToCart} columnOrder={columns} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition ${
              page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
