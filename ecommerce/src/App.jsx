import React, { useState,useEffect } from "react";
import Header from "./components/Header";
ElementsLayout
// import ReactJsAlert from "reactjs-alert";
// import <Header>
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Home
// import store from "./Store"

import ForgotPassword from "./components/Login/ForgotPassword"

import "./App.css";
// OrderDetail
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import ReviewCard from "./components/ReviewCard";
import AllProduct from "./components/ProductComponet/AllProduct";
import Search from "./components/ProductComponet/Search";
import Login from "./components/Login/Login";
import { loadUser } from "./actions/userActions";
import store from "./Store";
import { useDispatch, useSelector } from "react-redux";
import Useroptions from "./components/Useroptions";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/Login/UpdatePassword";
import ResetPassword from "./components/Login/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import CategorySections from "./components/Category";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment";
import ElementsLayout from "./components/ElementsLayout";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Cart/MyOrders";
import OrderDetails from "./components/Cart/OrderDetails";
import { Dashboard } from "@mui/icons-material";
import AdminDashboard from "./components/Admin/AdminDashboard";



// {loadUser}
export default function App() {
  // const dispatch = useDispatch()
  const GetApikey = async()=> {
    // console.log("yes")
    const {data} = await axios.get("/api/v1/payment/stripekey")
    
    setstripeApikey(data.stripekey)
  }
  useEffect(() => {
    store.dispatch(loadUser());
    GetApikey();
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApikey, setstripeApikey] = useState("")
  
  // console.log(stripeApikey)
  const [mode, setMode] = useState('light')
  const toggleStyle = ()=>{
    if(mode === 'light'){
      // document.body.style.backgroundColor = "black"
      setMode('dark')
    }
    else{
      // document.body.style.backgroundColor = "white"
      setMode('light')
    }
  }
  
  return (
    <>
    <BrowserRouter>
    <Header toggleStyle = {toggleStyle} mode={mode}/>
    {/* {isAuthenticated && <Useroptions user={user} />} */}
    <Routes>
    

    
    <Route path="/" element={<Home toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/product/:id" element={<ProductDetails toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/product" element={<AllProduct toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/search" element={<Search toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/products/:keyword" element={<AllProduct toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/login" element={<Login toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/categories" element={<CategorySections toggleStyle={toggleStyle} mode={mode} />}/>
    
    <Route
  path="/account"
  element={
    isAuthenticated ? (
      <Profile toggleStyle={toggleStyle} user={user} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/me/update"
  element={
    isAuthenticated ? (
      <UpdateProfile toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
{/* <ProtectedRoute exact path="" component={OrderSuccess} /> */}
<Route
  path="/success"
  element={
    isAuthenticated ? (
      <OrderSuccess toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
<Route
  path="/password/update"
  element={
    isAuthenticated ? (
      <UpdatePassword toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
  <Route path="/password/forgot" element={<ForgotPassword toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/reset/:token" element={<ResetPassword toggleStyle={toggleStyle} mode={mode} />}/>
    <Route path="/cart" element={<Cart toggleStyle={toggleStyle} mode={mode} />}/>
    <Route
        path="/shipping"
        element={
          isAuthenticated ? (
            <Shipping mode={mode} toggleStyle={toggleStyle}/>
          ) : (
            <Navigate to="/login?redirect=shipping" />
          )
        } />
      <Route
  path="/order/confirm"
  element={
    isAuthenticated ? (
      <ConfirmOrder toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login?redirect=order/confirm" />
    )
  }
/>
  
    {stripeApikey && isAuthenticated && (
              <Route
                element={<ElementsLayout stripe={loadStripe(stripeApikey)} />}
              >
                <Route path="/process/payment" element={<Payment />} />
              </Route>
            )}

            <Route
  path="/orders"
  element={
    isAuthenticated ? (
      <MyOrders toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  <Route
  path="/order/:id"
  element={
    isAuthenticated ? (
      <OrderDetails toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
{console.log(isAuthenticated)}
<Route
  path="/admin/dashboard"
  element={
    isAuthenticated ? (
      <AdminDashboard toggleStyle={toggleStyle} mode={mode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
   

    
    </Routes>
    
    <Footer toggleStyle = {toggleStyle} mode={mode}/>
    
    
    </BrowserRouter>
    

    </>
  );
}




