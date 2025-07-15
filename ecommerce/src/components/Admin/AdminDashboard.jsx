import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = (props) => {

  const lineState = {
    labels: ["Initial Amount", "Almost earned"],
    datasets:[{
      label: "Total Amount",
      data: [0, 4000],
      borderColor: 'rgb(161, 99, 255)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.3,
    }]
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [0, 10],
      },
    ],
  };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  return (
    <div className={`${props.mode==='dark'?'bg-gray-900 text-black':'bg-white text-black'} min-h-screen w-full grid grid-col-1 sm:grid-cols-[1fr_5fr]`}>
      <div className='border-r-1'>
        <Sidebar mode={props.mode}/>
      </div>
      
      <div className='p-5 '>
        <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} text-4xl font-bold mb-6 `}>
          Dashboard
        </div>
        
        <div className="Summary space-y-4">
          <div className='bg-red-200 p-4 rounded-lg text-center'>
            <p>Total Amount <br /> <span className='text-2xl font-bold'>₹100</span></p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Link to="/admin/products" className={`${props.mode==='dark'?'bg-blue-600 text-white':'bg-blue-100 text-blue-600'} hover:bg-blue-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Products</p>
              <p className='text-2xl font-bold'>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" className={`${props.mode==='dark'?'bg-green-600 text-white':'bg-green-100 text-green-600'} hover:bg-green-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Orders</p>
              <p className='text-2xl font-bold'>20</p>
            </Link>
            <Link to="/admin/users" className={`${props.mode==='dark'?'bg-purple-600 text-white':'bg-purple-100 text-purple-600'} hover:bg-purple-500 p-4 rounded-lg text-center transition-colors`}>
              <p className='text-lg font-semibold'>Users</p>
              <p className='text-2xl font-bold'>20</p>
            </Link>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row'>
          <div className="linechart mt-6 bg-white p-6 rounded-lg shadow w-[90vmin] sm:w-[60vmin] m-auto">
          <Line data={lineState} />
        </div>
        <div className="linechart mt-6 bg-white p-6 rounded-lg shadow w-[90vmin] sm:w-[60vmin] m-auto">
          <Doughnut data={doughnutState} />
        </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
