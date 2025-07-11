import React from 'react'
//onsubmit both login and register
//forget password route
import axios from "axios";
Link
import { useState, useEffect } from "react";
useNavigate
import './log.css'
import { Link, useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login,register, ClearError } from '../../actions/userActions';
login
const Login = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{loading, error, isAuthenticated} = useSelector((state)=>state.user)
    // const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
const redirect = queryParams.get("redirect") || "";
    // const [user, setUser] = useState({
    useEffect(() => {
    

    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch,  isAuthenticated]);
    
    //     name:"",
    //     email:"",
    //     password:""
    // });
    const handleRegisterSubmit = (e)=>{
        e.preventDefault();
        dispatch(register(name, registeremail, registerpassword))

    }

    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginemail, loginpassword))

    }

    

    
    const [overlay, setoverlay] = useState(false)
    
    const [loginemail, setLoginEmail] = useState("");
    const [loginpassword, setLoginPassword] = useState("");
    const [name, setName] = useState("");
    const [registeremail, setRegEmail] = useState("");
    const [registerpassword, setRegPassword] = useState("");
    

  return (
    <>
    <div className={`body ${props.mode==='dark'?'bg-gray-900':'bg-white'}`}>
        <div className={`${overlay?"right-panel-active":""} container bg-indigo-500` } id="container">
        <div class="form-container sign-up-container bg-indigo-500">
            <form id="registerForm" encType='multipart/form-data' onSubmit={handleRegisterSubmit}>
                <h1 className='yes'>Create Account</h1>
                
                
        <input type="text" id="register-name" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
    <input type="email" id="register-email" placeholder="Email" required onChange={(e) => setRegEmail(e.target.value)} />
    <input type="password" id="register-password" placeholder="Password" required onChange={(e) => setRegPassword(e.target.value)} />
    
      <button className='but bg-indigo-500'>Register</button>
      <p id="registerMessage" class="error-message"></p>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form id="loginForm" onSubmit={handleLoginSubmit}>
                <h1 className='yes'>Sign in</h1>
                
                <input type="email" id="email" placeholder="Email" required onChange={(e) => {
                            setLoginEmail(e.target.value);
                          }}/>
                <input type="password" id="password" placeholder="Password" required onChange={(e) => {
                            setLoginPassword(e.target.value);
                          }} />
                            <Link to="/password/forgot">
                          <p className='text-center text-sm m-3 text-gray-500'>Forgot Password?</p>
                </Link>
                <button className='but bg-indigo-500'>Sign In</button>
                <p id="errorMessage"></p>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1 className='yes'>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost but" id="signIn" onClick={()=>{setoverlay(false)}} >Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1 className='yes'>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button class="ghost but" id="signUp" onClick={()=>{setoverlay(true)}} >Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login