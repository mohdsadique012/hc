export const initialState = {
  products: [],
  cart: JSON.parse(sessionStorage.getItem('cart')) || [],
  loading: true,
  error: null,
  isCartOpen: false,
  filters: {
    search: '',
    category: 'All',
    sortBy: '',
    page: 1,
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) return state;
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case 'SET_PAGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.payload,
        },
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};
