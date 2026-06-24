// import React from "react";
// import { Card, Button } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";

// const AddressCard = ({
//   item,
//   showButton,
//   handleSelectAddress,
// }) => {
//   return (
//     <Card className="w-72 p-5 rounded-lg">

//       <div className="flex gap-3">

//         <HomeIcon color="primary" />

//         <div className="space-y-2">

//           <h1 className="font-bold text-lg">
//             {item?.fullName || "Home"}
//           </h1>

//           <p className="text-gray-500">
//             {item?.streetAddress}
//           </p>

//           <p className="text-gray-500">
//             {item?.city}, {item?.state}
//           </p>

//           <p className="text-gray-500">
//             {item?.postalCode}
//           </p>

//           <p className="text-gray-500">
//             {item?.country}
//           </p>

//           {showButton && (
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={() =>
//                 handleSelectAddress(item)
//               }
//             >
//               Select
//             </Button>
//           )}

//         </div>

//       </div>

//     </Card>
//   );
// };

// export default AddressCard;

import React from "react";
import { Card, Button, Chip } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddressCard = ({
  item,
  showButton,
  handleSelectAddress,
}) => {
  return (
    <Card
      className="
        w-80
        p-5
        rounded-2xl
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        hover:scale-105
        cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <HomeIcon sx={{ color: "#E91E63" }} />

          <h2 className="font-bold text-lg">
            {item?.fullName || "Home"}
          </h2>
        </div>

        <Chip
          label="Saved"
          size="small"
          color="success"
        />
      </div>

      {/* Address */}
      <div className="space-y-2 text-gray-400">

        <div className="flex gap-2">
          <LocationOnIcon
            fontSize="small"
            sx={{ color: "#E91E63" }}
          />

          <div>
            <p>{item?.streetAddress}</p>

            <p>
              {item?.city}, {item?.state}
            </p>

            <p>{item?.postalCode}</p>

            <p>{item?.country}</p>
          </div>
        </div>

      </div>

      {/* Button */}
      {showButton && (
        <Button
          fullWidth
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={{
            mt: 3,
            borderRadius: "12px",
            backgroundColor: "#E91E63",
            "&:hover": {
              backgroundColor: "#d81b60",
            },
          }}
          onClick={() => handleSelectAddress(item)}
        >
          Deliver Here
        </Button>
      )}
    </Card>
  );
};

export default AddressCard;