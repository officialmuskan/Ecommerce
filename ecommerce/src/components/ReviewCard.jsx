import React from 'react'
import ReactStars from 'react-stars'
import logo from "../assets/image.png"

const ReviewCard = (props) => {
  
  return (
    <div className={`${props.mode==='dark'?'bg-gray-800 text-white':'bg-zinc-100'} reviewCard flex flex-col border-2 border-zinc-300 w-56 p-5 m-4`} style={{flex:'none'}}>
        <img src={logo} alt="" className='h-16 w-16 rounded-full' />
        <p>{props.review.name}</p>
        
        <ReactStars edit={false} value={props.review.rating}/>
        <span className='text-zinc-500 text-center'>{props.review.comment}</span>
    </div>
  )
}

export default ReviewCard