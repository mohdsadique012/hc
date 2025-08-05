

export const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=100');

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();

  if (!data || !Array.isArray(data.products)) {
    throw new Error('Invalid API response format');
  }

  return data.products;
};
