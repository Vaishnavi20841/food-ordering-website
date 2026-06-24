import * as actionTypes from "./ActionType";
import { api } from "../../config/api";


// CREATE MENU ITEM
export const createMenuItem =
  ({ menu, jwt }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_MENU_ITEM_REQUEST,
    });

    try {
      const res = await api.post(
        "/api/admin/food",
        menu,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("created menu",res.data);
      dispatch({
        type: actionTypes.CREATE_MENU_ITEM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        console.log("catch error",error);
      dispatch({
        type: actionTypes.CREATE_MENU_ITEM_FAILURE,
        payload: error.message,
      });
    }
  };


// GET MENU ITEMS BY RESTAURANT ID
export const getMenuItemsByRestaurantId =
  (reqData) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    });

    try {
      const { data } = await api.get(
  `/api/food/restaurant/${reqData.restaurantId}`,
  {
    params: {
      vegetarian: reqData.vegetarian,
      nonveg: reqData.nonveg,
      seasonal: reqData.seasonal,
      food_category:
        reqData.foodCategory || undefined,
    },
    headers: {
      Authorization: `Bearer ${reqData.jwt}`,
    },
  }
);
        
      console.log("restaurant menu", data);
      dispatch({
        type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload:data,
        
      });

    } catch (error) {
      dispatch({
        type:actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error.message,
      });
    }
  };


// SEARCH MENU ITEM
export const searchMenuItem =
  ({ keyword, jwt }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.SEARCH_MENU_ITEM_REQUEST,
    });

    try {
      const res = await api.get(
        `/api/food/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.SEARCH_MENU_ITEM_SUCCESS,
        payload: res.data,
      });

      console.log("search result", res.data);
    } catch (error) {
      dispatch({
        type: actionTypes.SEARCH_MENU_ITEM_FAILURE,
        payload: error.message,
      });
    }
  };



// UPDATE MENU ITEM AVAILABILITY
export const UpdateMenuItemsAvailability = (reqData) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_REQUEST,
    });

    try {
      const res = await api.put(
        `/api/admin/food/${reqData.foodId}/availability`,
        {},
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
        payload: res.data,
      });

      console.log("availability updated", res.data);
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
        payload: error.message,
      });
    }
  };
};

// DELETE MENU ITEM
export const deleteFoodAction =
  ({ foodId, jwt }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_MENU_ITEM_REQUEST,
    });

    try {
      await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: actionTypes.DELETE_MENU_ITEM_SUCCESS,
        payload: foodId,
      });

      console.log("menu item deleted");
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_MENU_ITEM_FAILURE,
        payload: error.message,
      });
    }
  };

