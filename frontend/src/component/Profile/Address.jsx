import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../State/Authentication/Action";
import HomeIcon from "@mui/icons-material/Home";
import { Card } from "@mui/material";

const Address = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  console.log("USER =>", user);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        My Addresses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {user?.addresses?.map((address) => (
          <Card
            key={address._id}
            className="p-6 bg-[#1c1c1c]"
          >
            <div className="flex gap-4">

              <HomeIcon sx={{ fontSize: 35 }} />

              <div>

                <h2 className="text-xl font-bold">
                  {address.fullName}
                </h2>

                <p className="text-gray-400 mt-3">
                  {address.streetAddress}
                </p>

                <p className="text-gray-400">
                  {address.city}, {address.state}
                </p>

                <p className="text-gray-400">
                  {address.postalCode}
                </p>

                <p className="text-gray-400">
                  {address.country}
                </p>

              </div>

            </div>
          </Card>
        ))}

      </div>

      {user?.addresses?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No address found.
        </div>
      )}

    </div>
  );
};

export default Address;