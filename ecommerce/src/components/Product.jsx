import React from 'react'
import { Link } from 'react-router-dom'
import log from "../assets/image.png"

import ReactStars from 'react-stars'

const Product = ({product}) => {
  console.log(product.images[0].url)
  return (
    <>
    <Link className={`productCard rounded-full w-[14vmax] text-left flex flex-col m-[2vmax] p-[0.5vmax]`} to={`/product/${product._id}`}>
        <img className="w-full sm:h-50 rounded-md h-25 object-cover bg-indigo-400" src={product.images[0].url}  alt={product.name} />
        <p className='text-sm sm:text-md  mb-0 my-1'>{product.name}</p>
        <div className="sm:my-[0.5vmax] flex flex-col justify-start">
            <ReactStars edit={false} value={product.ratings}/>
            <div className='mx-0.5 text-sm'>{product.numofreviews} reviews</div>
        </div>
        <span className='sm:mx-1 sm:text-lg text-md'>{product.price}</span>
    
    </Link>

    
    </>
  )
}

export default Product