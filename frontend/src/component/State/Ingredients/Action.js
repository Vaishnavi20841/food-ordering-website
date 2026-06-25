import { API_URL,api } from "../../../config/api";
import * as actionTypes from "./ActionType";


// ======================
// GET INGREDIENTS OF RESTAURANT
// ======================

export const getIngredientsOfRestaurant =
  ({id, jwt }) =>
  async (dispatch) => {
     try {
      const { data } = await api.get(
        `/api/admin/ingredient/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(" get all ingredients",response.data);

      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data,
      });

    } catch (error) {
      console.log(
        "get ingredients error",
        error
      );
    }
  };


// ======================
// CREATE INGREDIENT
// ======================

export const createIngredients =
  ({ data, jwt }) =>
  async (dispatch) => {

    try {
      const response = await api.post(
        `/api/admin/ingredient`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "ingredient created",
        response.data
      );

      dispatch({
        type: actionTypes.CREATE_INGREDIENT_SUCCESS,
        payload: data,
      });

    } catch (error) {
      console.log(
        "create ingredient error",
        error
      );

      dispatch({
        type: actionTypes.CREATE_INGREDIENT_FAILURE,
        payload: error.message,
      });
    }
  };


// ======================
// CREATE INGREDIENT CATEGORY
// ======================

export const createIngredientCategory =
  ({ data, jwt }) =>
  async (dispatch) => {

    try {
      const response = await api.post(
        "/api/admin/ingredient/category",
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "ingredient category created",
        response.data
      );

      dispatch({
        type:
          actionTypes.CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      console.log(
        "category error",
        error
      );

      dispatch({
        type:
          actionTypes.CREATE_INGREDIENT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };


  // ======================
// GET INGREDIENT CATEGORY
// ======================

export const getIngredientCategory =
  ({ id, jwt }) =>
  async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredient/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "ingredient categories",
        response.data
      );

      dispatch({
        type: actionTypes.GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      console.log(
        "get ingredient category error",
        error
      );
    }
};


      


// ======================
// UPDATE STOCK OF INGREDIENT
// ======================

export const updateStockOfIngredients =
  ({ id, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredient/${id}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "stock updated",
        data
      );

      dispatch({
        type: actionTypes.UPDATE_STOCK,
        payload: data,
      });

    } catch (error) {
      console.log(
        "update stock error",
        error
      );
    }
  };