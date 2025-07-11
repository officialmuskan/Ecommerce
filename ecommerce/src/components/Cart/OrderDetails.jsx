import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails } from "../../actions/orderActions";
import Loader from "../Loader";
// import { useAlert } from "react-alert";


const OrderDetails = ({ mode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
//   const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  const isDark = mode === "dark";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`min-h-screen py-10 px-6 md:px-20 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          {/* <MetaData title="Order Details" /> */}
          <div className="mb-8">
            <h1 className="sm:text-[1.4vmax] text-[2.9vmax] font-bold text-indigo-500 mb-4">
              Order #{order && order._id}
            </h1>

            <h2 className="text-xl font-semibold text-indigo-600">Shipping Info</h2>
            <div className="mt-4 space-y-2">
              <p><span className="font-medium">Name:</span> {order.user && order.user.name}</p>
              <p><span className="font-medium">Phone:</span> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
              <p>
                <span className="font-medium">Address:</span> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </p>
            </div>

            <h2 className="text-xl font-semibold text-indigo-600 mt-6">Payment</h2>
            <div className="mt-4 space-y-2">
              <p className={`${order.paymentInfo?.status === "succeeded" ? "text-green-500" : "text-red-500"}`}>
                {order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
              </p>
              <p><span className="font-medium">Amount:</span> ₹{order.totalPrice}</p>
            </div>

            <h2 className="text-xl font-semibold text-indigo-600 mt-6">Order Status</h2>
            <div className="mt-4">
              <p className={`${order.orderStatus === "Delivered" ? "text-green-500" : "text-red-500"}`}>
                {order.orderStatus}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems && order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center space-x-4">
                  <img src={item.image} alt="Product" className="w-16 h-16 object-cover" />
                  <Link to={`/product/${item.product}`} className="text-indigo-500 hover:underline flex-1">
                    {item.name}
                  </Link>
                  <span>
                    {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
