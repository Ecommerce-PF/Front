import {
  GET_ALL_PRODUCTS,
  FILTER_BY_CATEGORY,
  GET_BY_NAME,
  FILTER_BY_PRICE,
  FILTER_BY_COLOR,
  RESET_FILTERS,
  GET_DETAIL,
  GET_USER,
  ORDER_BY_PRICE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  GET_USER_BY_ID,
  GET_USER_ALL,
  ID_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE, // Nueva acción para el caso de fallo en la eliminación del usuario
  ADMIN_USER,
} from "../actions/actions";

const initialState = {
  products: [],
  allProducts: [],
  productDetail: {},
  users: [],
  user: {},
  cart: [],
  idUsuario: [],
  userId: [],
  adminUser: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

    case GET_BY_NAME:
      if (!action.payload.length) {
        alert("Prod not Found");
      }
      return {
        ...state,
        products: action.payload,
      };

    case FILTER_BY_CATEGORY:
      const { payload: category } = action;
      if (category === "") {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredByCategoryProducts = state.allProducts.filter(
          (product) => product.category === category
        );
        return {
          ...state,
          products: filteredByCategoryProducts,
        };
      }

    case FILTER_BY_PRICE:
      const { payload: priceRange } = action;
      const [minPrice, maxPrice] = priceRange;
      const filteredByPriceProducts = state.allProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
      return {
        ...state,
        products: filteredByPriceProducts,
      };

    case ORDER_BY_PRICE:
      let sortAsc = action.payload === "asc";
      const sortedPrice = state.allProducts.slice().sort(function (a, b) {
        if (a.price > b.price) {
          return sortAsc ? 1 : -1;
        }
        if (a.price < b.price) {
          return sortAsc ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        products: sortedPrice,
      };

    case FILTER_BY_COLOR:
      const { payload: color } = action;
      if (color === "") {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredByColorProducts = state.allProducts.filter((product) => {
          if (product.color && product.color.length > 0) {
            return product.color.some(
              (c) =>
                c.ColorName && c.ColorName.toLowerCase() === color.toLowerCase()
            );
          }
          return false;
        });
        return {
          ...state,
          products: filteredByColorProducts,
        };
      }

    case GET_USER_BY_ID:
      return { ...state, userId: action.payload };

    case RESET_FILTERS:
      return {
        ...state,
        products: state.allProducts,
      };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case GET_USER_ALL:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: updatedProducts,
      };

    case DELETE_PRODUCT_FAILURE:
      alert("Ha ocurrido un error al eliminar la prenda");

      return state;

    case DELETE_USER_SUCCESS: // Nueva acción para el caso de éxito en la eliminación del usuario
      const updatedUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
      };

    case DELETE_USER_FAILURE: // Nueva acción para el caso de fallo en la eliminación del usuario
      alert("Ha ocurrido un error al eliminar el usuario");

      return state;

    case ID_USER:
      return {
        ...state,
        idUsuario: action.payload,
      };

    case ADMIN_USER:
      return {
        ...state,
        adminUser: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
