import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const AdminDashboard = (props) => {
  return (
    <div className={`${props.mode==='dark'?'bg-gray-900 text-black':'bg-white text-black'}  min-h-screen w-full grid grid-cols-[1fr_5fr]`}>
      {/* Sidebar Section */}
      <div className='border-r-1'>
        <Sidebar mode={props.mode}/>
      </div>
      
      {/* Main Content Section */}
      <div className='p-5'>
        {/* Dashboard Header */}
        <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} text-xl font-bold mb-6 text-center`}>
          Dashboard
        </div>
        
        {/* Summary Section */}
        <div className="Summary space-y-4">
          {/* Total Amount Card */}
          <div className='bg-red-200 p-4 rounded-lg text-center'>
            <p>
              Total Amount <br /> 
              <span className='text-2xl font-bold'>₹100</span>
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Link to="/admin/products" className={`${props.mode==='dark'?'bg-blue-600 text-white':'bg-blue-100 text-blue-600'}  bg-blue-100 hover:bg-blue-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Products</p>
              <p className='text-2xl font-bold'>20</p>
            </Link>
            
            <Link to="/admin/orders"  className={`${props.mode==='dark'?'bg-green-600 text-white':'bg-green-100 text-green-600'}  bg-green-100 hover:bg-green-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Orders</p>
              <p className='text-2xl font-bold '>20</p>
            </Link>
            
            <Link to="/admin/users"  className={`${props.mode==='dark'?'bg-purple-600 text-white':'bg-blue-100 text-purple-600'}  bg-purple-100 hover:bg-purple-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Users</p>
              <p className='text-2xl font-bold'>20</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;