import React, { useEffect, useState } from 'react'
import Product from './Product'
import log from '../assets/image.png'
import ReactJsAlert from 'reactjs-alert'
import { FaArrowDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ClearError, getProduct } from '../actions/productActions'
import Loader from './Loader'
import Products from '../assets/headphones-audio-listen.jpg'
import Img from "../assets/elegant-smartphone-composition.jpg"
// getProduct
import Img2 from "../assets/43918.jpg"
const product = {
    name:"Blue Shirt",
    images:[{url:log}],
    price:"Rs.1000",
    _id:"abhi"
}
const Home = (props) => {
    const [status, setStatus] = useState(false);
  const [type, setType] = useState("success");
  const [title, setTitle] = useState("This is a success alert");
    const {loading, error, products, productCount} = useSelector((state)=>state.products)
    console.log(error)
    const dispatch = useDispatch();
    useEffect(() => {
        if(error){
            setStatus(true);
            setType("error");
            setTitle(error)
            dispatch(ClearError())
        }
        dispatch(getProduct());    
    }, [dispatch, error])

   
   
   
  return (
    <>
   
   <ReactJsAlert
        status={status}
        type={type}
        title={title}
        Close={() => setStatus(false)}
      />
 

    <div className={`${props.mode==='dark'?'bg-gray-900 text-white darkmode':'bg-white banner'} custom back  w-full sm:h-[73vmin] h-full  flex sm:flex-row flex-col p-6 justify-evenly items-center`}>
        <div style={{zIndex:40}} className={`flex flex-col items-start`}>
        <h1 className={`${props.mode==='dark'?'bg-gray-900 ':'bg-white'} text-indigo-500 pr-4 pt-3 font-semibold text-[3vmax] text-center `}>FIND </h1>
        <h1 className={`${props.mode==='dark'?'bg-gray-900 ':'bg-white text-gray-700'} font-semibold sm:text-[4vmax] text-[5vmax]  tracking-wide`}> Amazing Products.</h1>
        
        {/* <h1 className={`${props.mode==='dark'?'bg-gray-900':'bg-white'}  px-2 font-semibold text-center text-[5.5vmax] tracking-widest`}> PRODUCTS</h1> */}
        <div className='flex flex-col justify-around items-start  w-[100%]'>
            <p className={`${props.mode==='dark'?'bg-gray-900 text-gray-200':'bg-white text-gray-400'} sm:text-[1.5vmax]  text-[2vmax] pb-5  pr-5`}>Welcome to Shopfinity.  Get products at amazing deals!</p>
        
        <a href="#container">
        <button className={`${props.mode==='dark'?'bg-gray-900':'bg-white'} text-indigo-500  block  sm:pb-5 sm:pr-5 font-bold py-1 flex gap-2 justify-center items-center`}> <div className='flex justify-center items-center rounded-full sm:w-7 sm:h-7 h-5 w-5 font-bold border-4 text-center'><FaArrowDown className='text-center'  size={12}/></div> <div className=' sm:text-[1.3vmax] hover:text-indigo-900 text-[2.4vmax]'>Explore Now</div></button></a>
        

        </div>
        </div>
        
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Left column - single tall image */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={Products} 
                alt="Mountain village at sunset"
                className="w-full sm:h-96 object-cover"
              />
            </div>
          </div>
          
          {/* Right column - two stacked images */}
          <div className="space-y-5">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={Img}
                alt="Forest trail"
                className="w-full sm:h-50 h-25 object-cover"
              />
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={Img2}
                alt="Lake reflection"
                className="w-full sm:h-44 h-26 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
   
       


        
        
        
        
        
        
        

    </div>
    {/* <div className={`combine ${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'}`}>
    <div className="spacer layer2 ">
   
        </div>
    <div className="spacer layer1">
        
        </div>
        </div> */}
    
        
    

    
    <div id='container' className ={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'}`}>
    <h1 className='text-center text-zinc-800  mx-auto text-2xl sm:text-[3vmax] pt-10 font-bold'>Featured Products</h1>
    
    {loading?(<Loader mode={props.mode}/>):(<div className=" flex py-2  w-full flex-wrap justify-center" >
        
        {products && products.map(product=><Product key={product._id} product={product}></Product>).slice(0,5)}

    </div>)}
    
        </div>
    </>
    
    
  )
}

export default Home