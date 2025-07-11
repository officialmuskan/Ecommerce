import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = (props) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white text-black'} min-h-screen bg-white grid md:grid-cols-3`}>
      <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white text-black'} md:col-span-2 p-8`}>
        <h2 className="text-indigo-500 text-2xl font-semibold mb-6">Shipping Info</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Phone:</span> {shippingInfo.phoneNo}</p>
          <p><span className="font-semibold">Address:</span> {address}</p>
        </div>

        <h2 className="text-indigo-500 text-2xl font-semibold mt-10 mb-4">Your Cart Items</h2>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.product} className="flex items-center justify-between">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
              <Link to={`/product/${item.product}`} className="text-indigo-500 hover:underline w-1/2">
                {item.name}
              </Link>
              <span className="text-gray-600">{item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white text-black'} border-t md:border-l md:border-t-0 p-8 bg-gray-50`}>
        <h2 className="text-indigo-500 text-2xl font-semibold mb-4 text-center">Order Summary</h2>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <p>Shipping Charges:</p>
            <span>₹{shippingCharges}</span>
          </div>
          <div className="flex justify-between">
            <p>GST:</p>
            <span>₹{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between mt-4 border-t pt-4 font-semibold">
          <p>Total:</p>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={proceedToPayment}
          className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded shadow"
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
