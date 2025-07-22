import React from 'react'
import {FaInstagram, FaTwitter, FaLinkedin} from 'react-icons/fa'

const Footer = (props) => {
    const navItems = [
        'Home',
        'Product',
        'Contact',
        'About',
        
      ];
      const categories = ['All', 'Electronics', 'Clothes', 'Shoes']
  return (
    
    <div className={`${props.mode==='dark'?'bg-gray-800 text-white':'bg-zinc-100'} footer flex flex-col sm:flex-row sm:justify-evenly items-center`} >
        <div className="py-12">
        <div className="first text-center">
            <h1 className='text-3xl font-bold text-indigo-500 mx-2 sm:text-4xl'>Shopfinity</h1>
            <p className='mx-2 text-sm sm:text-base font-semibold text-grey-600 my-4 w-56 lg:w-100'>High quality product is our first priority. Your one stop solution for all the products.</p>
            <div className="logos  flex cursor-pointer justify-center">
                <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-stone-50'} logo rounded-full mx-3 p-3 text-xl hover:text-gray-600  `}>
                    <FaInstagram/>
                </div>
                <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-stone-50'} logo rounded-full mx-3 p-3 text-xl hover:text-gray-600`}>
                    <FaTwitter></FaTwitter>
                    
                </div>
                <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-stone-50'} logo rounded-full mx-3 p-3 text-xl hover:text-gray-600`}>
                    <FaLinkedin/>
                    
                </div>
                

            </div>

            

        </div>
        
        </div>
        <div className="second my-9 text-center ">
         <div className=''>
        <div className="text-sm font-medium">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`hover:text-gray-600 cursor-pointer my-4`}
          >
            {item}
          </div>

        ))}
        
      </div>
      </div>   
        </div>
        

        <div className="third my-9 text-center">
         <div className=''>
        <div className="text-sm font-medium">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`hover:text-gray-600 cursor-pointer my-4`}
          >
            {item}
          </div>

        ))}
        <p className={`hover:text-gray-600 cursor-pointer my-4 text-sm sm:text-base`}>
        &copy;   2024. All rights reserved</p>
        
      </div>
      </div>   
        </div>
        
    </div>
  )
}

export default Footer