import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
// import CheckCircleIcon from "@material-ui";
// import { Typography } from "@material-ui";
import { Link } from "react-router-dom";
CheckCircle
Typography
const OrderSuccess = (props) => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center  bg-white text-center">
      <CheckCircle className="text-indigo-500" style={{ fontSize: "6rem" }} />

      <Typography
        variant="h5"
        className="text-gray-800 font-semibold mt-4 text-xl sm:text-2xl"
      >
        Your Order has been Placed Successfully
      </Typography>

      <Link
        to="/orders"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-900 transition"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
