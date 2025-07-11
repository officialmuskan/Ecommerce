import React from 'react'
import { Link } from 'react-router-dom'
Link

const CardItem = ({item, deleteCartItems}) => {
  return (
    <div className='flex sm:p-[1vmax] sm:h-[8vmax] items-start h-[25vmax] p-[3vmax]'>
        <img src="" alt="" />
        <div className='flex sm:my-[0.3vmax] sm:mx-[1vmax] my-[1vmax] mx-[2vmax] flex-col '>
           <Link className='sm:text-[0.9vmax] text-[2vmax]  font-bold' to={`/product/${item.product}`}>
           <i>{item.name}</i>
           </Link>
           <span className='sm:text-[0.9vmax] text-[2vmax] font-semibold'>{`Price: ₹${item.price}`}</span>
        <p className='sm:text-[0.8vmax] text-[1.8vmax]' onClick={() => deleteCartItems(item.product)}>Remove</p>
      
           </div>

    </div>
    
  )
}

export default CardItem