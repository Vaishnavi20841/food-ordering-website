import * as actionTypes from "./ActionType";

const initialState = {
  ingredients: [],
  update: null,
  category: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================
    // GET INGREDIENTS
    // ======================
    case actionTypes.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };

    // ======================
    // GET CATEGORY
    // ======================
    case actionTypes.GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };

    // ======================
    // CREATE CATEGORY
    // ======================
    case actionTypes.CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };

    // ======================
    // CREATE INGREDIENT
    // ======================
    case actionTypes.CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    // ======================
    // UPDATE STOCK
    // ======================
    case actionTypes.UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredients: state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};