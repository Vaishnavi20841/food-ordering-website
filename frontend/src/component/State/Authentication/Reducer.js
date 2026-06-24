import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  REMOVE_FROM_FAVORITE_REQUEST,
  REMOVE_FROM_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE_FAILURE,
  LOGOUT,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
};

// 🔥 ensure unique favorites
const uniqueById = (arr) => {
  return Array.from(
    new Map(arr.map((item) => [item._id, item])).values()
  );
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // ================= REQUEST =================
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
    case REMOVE_FROM_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    // ================= AUTH SUCCESS =================
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: true,
      };

    // ================= USER =================
    case GET_USER_SUCCESS:
  return {
    ...state,
    isLoading: false,
    user: action.payload,
    favorites: action.payload.favorites || [],
  };

case ADD_TO_FAVORITE_SUCCESS:
  return {
    ...state,
    isLoading: false,
  };

case REMOVE_FROM_FAVORITE_SUCCESS:
  return {
    ...state,
    isLoading: false,
  };
  
    // ================= FAILURE =================
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case REMOVE_FROM_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ================= LOGOUT =================
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};