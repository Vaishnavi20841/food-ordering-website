import * as actionTypes from "./ActionType";
import { LOGOUT } from "../Authentication/ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  success: null,
};

export const cartReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    // ======================
    // REQUESTS
    // ======================
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.ADD_ITEMS_TO_CART_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
    case actionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ======================
    // FIND CART
    // ======================
    case actionTypes.FIND_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items || [],
        error: null,
      };

    // ======================
    // ADD ITEM
    // ======================
    case actionTypes.ADD_ITEMS_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Item Added Successfully",
      };

    // ======================
    // UPDATE ITEM
    // ======================
    case actionTypes.UPDATE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? action.payload
            : item
        ),
      };

    // ======================
    // REMOVE ITEM
    // ======================
    case actionTypes.REMOVE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    // ======================
    // CLEAR CART
    // ======================
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: {
          ...state.cart,
          items: [],
          total: 0,
        },
        cartItems: [],
      };

    // ======================
    // FAILURES
    // ======================
    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
    case actionTypes.ADD_ITEMS_TO_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
    case actionTypes.CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ======================
    // LOGOUT
    // ======================
    case LOGOUT:
      localStorage.removeItem("jwt");

      return {
        cart: null,
        cartItems: [],
        loading: false,
        error: null,
        success: "Logout Success",
      };

    default:
      return state;
  }
};

export default cartReducer;