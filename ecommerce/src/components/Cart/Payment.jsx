import React,{useRef, useEffect} from 'react';
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createOrder } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';
axios
createOrder
useNavigate


const Payment = (props) => {
  const isDark = false
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
console.log(orderInfo)
  const dispatch = useDispatch();
  const nav = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
   const { error } = useSelector((state) => state.newOrder);
   console.log(error)
   const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          nav("/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      
    }
  }, [ error, alert]);


  return (
    <div
      className={`min-h-[65vh] grid place-items-center px-6 py-8 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <form className={`w-full max-w-md space-y-6`} onSubmit={submitHandler}>
        <p
          className={`text-center pb-2 text-2xl font-medium ${
            isDark
              ? "text-white border-gray-600"
              : "text-gray-800 border-gray-300"
          }`}
        >
          Card Info
        </p>

        {/* Card Number */}
        <div className="relative flex items-center  m-[2vmax] ">
          <CreditCard
            className={`absolute left-3 text-xl ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <CardNumberElement
            className={`pl-10 py-3 w-100 border-4 rounded-md border outline-none ${
              isDark
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        {/* Expiry Date */}
        <div className="relative flex items-center m-[2vmax]">
          <Event
            className={`absolute left-3 text-xl ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <CardExpiryElement
            className={`pl-10 py-3 w-100 border-4 rounded-md border outline-none ${
              isDark
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        {/* CVC */}
        <div className="relative flex items-center  m-[2vmax]">
          <VpnKey
            className={`absolute left-3 text-xl ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <CardCvcElement
            className={`pl-10 py-3 w-100 rounded-md border outline-none ${
              isDark
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        <button ref={payBtn}
          type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          className={`w-full py-3 rounded-md font-medium transition duration-300 ${
            isDark
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-indigo-500 hover:bg-indigo-900 text-white"
          }`}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
