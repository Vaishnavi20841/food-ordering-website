
import { api } from "../../config/api";
import {
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,

  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,

  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,

  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,

  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,

  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,

  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_FAILURE,

  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,

  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,

  GET_RESTAURANT_EVENTS_REQUEST,
  GET_RESTAURANT_EVENTS_SUCCESS,
  GET_RESTAURANT_EVENTS_FAILURE,

  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,

  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
} from "./ActionType";

// import { api } from "../../config/api";



// GET ALL RESTAURANTS

export const getAllRestaurantsAction = (token) => async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
  dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });

  try {
    const { data } = await api.get("/api/restaurants", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_ALL_RESTAURANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESTAURANTS_FAILURE,
      payload: error.message,
    });
  }
};


// GET RESTAURANT BY ID
export const getRestaurantById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

  try {
    const response = await api.get(
      `/api/restaurants/${reqData.restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    console.log("🔥 RESTAURANT API RESPONSE =", response.data);

    dispatch({
      type: GET_RESTAURANT_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};


// GET RESTAURANT BY USER ID
export const getRestaurantByUserId = (jwt) => async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });

  try {
    const { data } = await api.get("/api/admin/restaurants/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload: error.message,
    });
  }
};


// CREATE RESTAURANT
   export const createRestaurant =
  (reqData) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: CREATE_RESTAURANT_REQUEST,
    });

    try {
      const { data } = await api.post(
        "/api/admin/restaurants",
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );

      dispatch({
        type: CREATE_RESTAURANT_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: CREATE_RESTAURANT_FAILURE,
        payload: error.message,
      });
    }
  };

// UPDATE RESTAURANT STATUS
export const updateRestaurantStatus = ({ restaurantId, restaurantData,jwt}) => {
     return async (dispatch) => {
        console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const { data } = await api.put(
        `/api/admin/restaurants/${restaurantId}`,
        restaurantData,
        
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_FAILURE,
        payload: error.message,
      });
    }
    }
  };

  export const deleteRestaurant = ({ restaurantId, jwt }) =>{ 
    return async (dispatch) => {
        console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
  dispatch({ type: DELETE_RESTAURANT_REQUEST });

  try {
        await api.delete(
      `/api/admin/restaurants/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: DELETE_RESTAURANT_SUCCESS,
      payload: restaurantId,
    });

    console.log("Restaurant Deleted");
  } catch (error) {
    console.log("delete restaurant error", error);

    dispatch({
      type: DELETE_RESTAURANT_FAILURE,
      payload: error.message,
    });
}
  }
};


  export const CreateEventAction =
  ({ data, jwt,restaurantId }) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: CREATE_EVENTS_REQUEST,
    });

    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("event created", res.data);

      dispatch({
        type: CREATE_EVENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: CREATE_EVENTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };



// GET ALL EVENTS
export const getAllEvents = ({ jwt }) => async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
  dispatch({ type: GET_ALL_EVENTS_REQUEST });

  try {
    const { data } = await api.get(`/api/events`,{
        headers: {
            Authorization:`Bearer ${jwt}`,
        },
    });
    console.log("get all events", data);
    dispatch({
      type: GET_ALL_EVENTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_FAILURE,
      payload: error.message,
    });
  }
};


// DELETE EVENT
export const DeleteEventAction =
  ({ eventId, jwt }) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: DELETE_EVENTS_REQUEST,
    });

    try {
      const res = await api.delete(
        `/api/admin/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("DELETE events", res.data);

      dispatch({
        type: DELETE_EVENTS_SUCCESS,
        payload: eventId,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: DELETE_EVENTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const getRestaurantEvents =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: GET_RESTAURANT_EVENTS_REQUEST,
    });

    try {
      const res = await api.get(
        `/api/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(" get restaurant event", res.data);

      dispatch({
        type: GET_RESTAURANT_EVENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: GET_RESTAURANT_EVENTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const CreateCategoryAction =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });

    try {
      const res = await api.post(
        "/api/admin/category",
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("category created", res.data);

      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };



export const getRestaurantCategory =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    console.log("REQUEST TYPE", GET_ALL_RESTAURANTS_REQUEST);
    dispatch({
      type: GET_RESTAURANT_CATEGORY_REQUEST,
    });

    try {
      const res = await api.get(
        `/api/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("restaurant categories", res.data);

      dispatch({
        type: GET_RESTAURANT_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: GET_RESTAURANT_CATEGORY_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };