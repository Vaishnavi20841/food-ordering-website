import {
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,

  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,

  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
} from "./ActionType";

const initialState = {
  restaurants: [],
  restaurant: null,
  categories: [],   // ⭐ ADD THIS (IMPORTANT)
  loading: false,
  error: null,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {

    // GET ALL RESTAURANTS
    case GET_ALL_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };

    case GET_ALL_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // GET BY ID
    case GET_RESTAURANT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };

    case GET_RESTAURANT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // GET CATEGORIES
    case GET_RESTAURANT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_RESTAURANT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,   // ✅ FIXED
      };

    case GET_RESTAURANT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;