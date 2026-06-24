import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { getUsersOrders } from "../State/Order/Action";

const Orders = () => {

  const dispatch = useDispatch();

  const { orders } = useSelector(
    store => store.order
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [dispatch]);

  console.log("ORDERS =>", orders);

  return (
    <div className="flex items-center flex-col">

      <h1 className="text-xl text-center py-7 font-semibold">
        My Orders
      </h1>

      <div className="space-y-5 w-full lg:w-1/2">

        {orders?.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))}

      </div>

    </div>
  );
};

export default Orders;