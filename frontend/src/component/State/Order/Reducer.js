import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,

  GET_USERS_ORDER_REQUEST,
  GET_USERS_ORDER_SUCCESS,
  GET_USERS_ORDER_FAILURE,

  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,

  orders: [],
  order: null,

  error: null,

  notifications: [],

  // separate loading for cancel (better UX)
  cancelLoading: false,
};

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    // ======================
    // CREATE ORDER
    // ======================

    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // ======================
    // GET USER ORDERS
    // ======================

    case GET_USERS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USERS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        error: null,
      };

    case GET_USERS_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // ======================
    // CANCEL ORDER
    // ======================

    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        cancelLoading: true,
        error: null,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        cancelLoading: false,
        error: null,

        // update order list
        orders: state.orders.map((item) =>
          item._id === payload._id ? payload : item
        ),

        // update selected order if opened in UI
        order:
          state.order && state.order._id === payload._id
            ? payload
            : state.order,
      };

    case CANCEL_ORDER_FAILURE:
      return {
        ...state,
        cancelLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};