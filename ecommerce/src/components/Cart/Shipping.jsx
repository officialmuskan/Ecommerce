import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { Country, State } from "country-state-city";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCity, FaGlobe, FaPhone, FaMapPin, FaExchangeAlt } from "react-icons/fa";
// import CheckoutSteps from "../Cart/CheckoutSteps";



const Shipping = (props) => {
    const dispatch = useDispatch();
//   const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    // if (phoneNo.length !== 10) {
    //   alert.error("Phone Number should be 10 digits long");
    //   return;
    // }
    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate("/order/confirm");
  };
  return (
    <>
    <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white text-black'} w-full  min-h-screen flex items-center justify-center`}>
        <div className="w-full max-w-4xl p-8 mb-4 shadow-lg rounded-lg flex justify-around items-center flex-wrap">
          <h2 className="text-2xl mb-5 font-semibold text-center ">Shipping Details</h2>
           <form className={`${props.mode==='dark'?'bg-gray-900 text-black':'bg-white text-black'} flex flex-row gap-4 mt-3`} onSubmit={shippingSubmit}>
            <div className="relative">
              <FaHome className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <FaCity className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <FaMapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <FaGlobe className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="relative">
                <FaExchangeAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="">State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 my-3 rounded hover:bg-indigo-900 transition"
              disabled={!state}
            >
              Continue
            </button>
          </form>
          </div>
        </div>
      

    </>
  )
}

export default Shipping