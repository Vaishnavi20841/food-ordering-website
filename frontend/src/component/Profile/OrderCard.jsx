import React from "react";
import { Card, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../State/Order/Action";
import toast from "react-hot-toast";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleCancel = () => {
    dispatch(cancelOrder({ orderId: order._id, jwt }))
      .then(() => {
        toast.success("Order cancelled successfully");
      })
      .catch(() => {
        toast.error("Failed to cancel order");
      });
  };

  // ✅ Only PENDING orders can be cancelled
  const canCancel = order?.orderStatus === "PENDING";
  

  return (
    <Card className="flex justify-between items-center p-6 bg-[#1c1c1c] rounded-lg">

      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4">

  {order?.items?.map((item) => (
    <div
      key={item._id}
      className="flex items-center gap-4"
    >
      <img
        src={
          item?.food?.images?.[0] ||
          "https://via.placeholder.com/120"
        }
        alt={item?.food?.name}
        className="w-20 h-20 rounded-lg object-cover"
      />

      <div>
        <p className="font-bold text-xl text-white">
          {item?.food?.name} × {item?.quantity}
        </p>
      </div>
    </div>
  ))}

  <div>
          <div className="mb-2">
  {order?.items?.map((item) => {

    // console.log("FOOD =", item?.food);
    // console.log("FOOD IMAGE =", item?.food?.images);

    return (
      <p key={item._id} className="font-bold text-xl text-white">
        {item?.food?.name} × {item?.quantity}
      </p>
    );
  })}
</div>

          <p className="text-gray-300">
            🍽 {order?.restaurant?.name}
          </p>

          <p className="text-gray-300 mt-1">
            Total: ₹{order?.totalAmount}
          </p>

          <p className="text-gray-500">
            {order?.items?.length} Item(s)
          </p>

          <div className="mt-3 text-gray-500 text-sm">
            <p>📍 {order?.deliveryAddress?.streetAddress}</p>
            <p>
              {order?.deliveryAddress?.city},{" "}
              {order?.deliveryAddress?.state}
            </p>
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Ordered on:{" "}
            {new Date(order?.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>
      </div>

      {/* RIGHT SIDE - STATUS */}
      <div className="ml-auto flex flex-col items-end gap-2">

        <Button
          variant="contained"
          color={
            order?.orderStatus === "DELIVERED"
              ? "success"
              : order?.orderStatus === "OUT_FOR_DELIVERY"
              ? "info"
              : order?.orderStatus === "PENDING"
              ? "warning"
              : order?.orderStatus === "CANCELLED"
              ? "error"
              : "secondary"
          }
        >
          {order?.orderStatus}
        </Button>

        {/* ✅ SINGLE CANCEL BUTTON */}
        {canCancel && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            sx={{ mt: 1 }}
          >
            Cancel Order
          </Button>
        )}

      </div>

    </Card>
  );
};

export default OrderCard;