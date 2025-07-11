import React, {useState} from 'react';
useSelector
import { FaUser, FaSun, FaSearch, FaShoppingCart, FaBars, FaTimes, FaMoon } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Replace with your logo
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Useroptions from './Useroptions';
const Header = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  const navItems = [
    'Home',
    'Product',
    'Contact',
    'Categories'
    
  ];

  return (
    <nav className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} shadow-md px-5 py-4 flex items-center justify-evenly relative`}>
      {/* Logo */}
      <div className="">
        {/* <img src={logo} alt="Logo" className="w-6 h-6" /> */}
        <h1 className="font-bold text-xl text-indigo-500">FanCart</h1>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-10 text-md font-medium">
        {navItems.map((item, index) => (
          <li
            key={index} 
            className={`hover:text-gray-600 cursor-pointer `}
          >
            <Link to={`/${item!="Home"?item.toLowerCase():''}`}>{item}</Link>
            
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} flex items-center gap-6
      
      text-gray-700 text-lg mx-2`}>
        <Link to="/search">
      <FaSearch className="cursor-pointer hover:text-gray-600" /></Link>
      <Link to="cart"><FaShoppingCart className="cursor-pointer hover:text-gray-600" />
        </Link>
      
        {props.mode === 'light'?(
          <FaMoon className="cursor-pointer hover:text-black" onClick={props.toggleStyle} />
        
          
      
        ):(
          <FaSun className="cursor-pointer hover:text-yellow-600" onClick={props.toggleStyle} />
      
        )}
        {isAuthenticated?(
          <Useroptions user={user}/>):(<Link to='login'>
        <FaUser className="cursor-pointer hover:text-gray-600" /></Link>
        )}
        </div>

      <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} md:hidden text-xl text-gray-800`}>
        <FaBars onClick={() => setSidebarOpen(true)} className="cursor-pointer" />
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`${props.mode==='dark'?'bg-gray-800 text-white':'bg-white'} fixed top-0 left-0 w-3/4 h-full shadow-lg z-50 p-6 flex flex-col gap-6`}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Menu</span>
            <FaTimes
              className="text-xl cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`hover:text-gray-600 cursor-pointer `}
            >
              {item}
            </div>
          ))}
          <hr />
          <div className={`${props.mode==='dark'?'bg-gray-800 text-white':'bg-white'} flex gap-4 text-gray-700 text-lg`}>
          <Link to="/search">
          <FaSearch className="cursor-pointer hover:text-gray-600" /></Link>
      <FaShoppingCart className="cursor-pointer hover:text-gray-600" />
        <FaUser className="cursor-pointer hover:text-gray-600" />
        {props.mode === 'light'?(
          <FaMoon className="cursor-pointer hover:text-black" onClick={props.toggleStyle} />
      
        ):(
          <FaSun className="cursor-pointer hover:text-yellow-600" onClick={props.toggleStyle} />
      
        )}
          </div>
        </div>
      )}


    </nav>
  );
};

export default Header;
