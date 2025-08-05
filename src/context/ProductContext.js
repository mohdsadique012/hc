import React, { createContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { productReducer, initialState } from './productReducer';
import { fetchProducts } from '../utils/api/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = useCallback(async () => {
    try {
      const products = await fetchProducts();
      dispatch({ type: 'FETCH_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Something went wrong' });
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const filteredProducts = useMemo(() => {
    let result = [...state.products];
    const { search, category, sortBy } = state.filters;

    if (search) {
      result = result.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
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
  }, [state.products, state.filters]);

  const paginatedProducts = useMemo(() => {
    const start = (state.filters.page - 1) * 10;
    return filteredProducts.slice(start, start + 10);
  }, [filteredProducts, state.filters.page]);

  const totalPages = Math.ceil(filteredProducts.length / 10);

  const setFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const setPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const categories = useMemo(() => {
    const unique = [...new Set(state.products.map(p => p.category).filter(Boolean))];
    return unique;
  }, [state.products]);

  const value = useMemo(() => ({
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
    setFilters,
    setPage,
    filteredProducts: paginatedProducts,
    totalPages,
    categories,
  }), [state, paginatedProducts, totalPages, categories]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
