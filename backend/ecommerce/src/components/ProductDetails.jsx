import React, { useEffect, useSyncExternalStore,useState } from 'react'
import {Card, Box, Rating, Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, ClearError, newReview } from '../actions/productActions'
import { useParams, useNavigate } from 'react-router-dom'
import logo from "../assets/image.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-stars'
import ReviewCard from './ReviewCard'
import Loader from './Loader'
import ReactJsAlert from 'reactjs-alert'
{Rating} {Dialog}
useParams
{NEW_REVIEW_RESET}
import { addItemstoCart } from '../actions/cartActions'
import { NEW_REVIEW_RESET } from '../constants/productConstants'
useState
addItemstoCart


  
const ProductDetails = (props) => {
  const nav = useNavigate()
  const {id} = useParams()
    const[status, setStatus] = useState(false);
    const [type, setType] = useState("success");
      const [title, setTitle] = useState("This is a success alert");
        const [quantity, setquantity] = useState(1);
         const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

        const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const reviewSubmitHandler = () => {
    

    dispatch(newReview(rating, comment, id));

    setOpen(false);
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
        const increasedQuantity = ()=>{
          if(product.Stock <= quantity) return;
          const qty = quantity+1;
          setquantity(qty)
        }
        const decreasedQuantity = ()=>{
          if(quantity<=1)return
          const qty = quantity-1;
          setquantity(qty)
        }
        const addToCarthandle = ()=>{
          dispatch(addItemstoCart(id, quantity));
          alert("Items Added to Cart")
        }
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.product
      );
    // const {id} = useParams()
    useEffect(()=>{
        if(error){
            setStatus(true);
            setType("error");
            setTitle(error)
            dispatch(ClearError())
        }
         if (reviewError) {
          nav("/login")
          dispatch(ClearError());
      
    }

    if (success) {
      alert("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
        dispatch(getProductDetails(id))
    }, [dispatch, id, success, reviewError,alert, error])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        
      };
  return (
    <>
    <ReactJsAlert
            status={status}
            type={type}
            title={title}
            Close={() => setStatus(false)}
          />
    
    {loading?(<Loader mode={props.mode}/>):(<><div className={` ${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} ProductDetails w-[100vw] flex-col sm:flex sm:flex-row px-[10vmax] py-10`} style={{maxWidth:'100%'}}>
        <div className='justify-evenly items-center sm:p-10 w-full sm:w-1/2' >
            
        <Slider {...settings}>
        {product.images && product.images.map((item, i)=>(
                
                <img src={product.images[0].url} key={i} className='CaraouselImage h-[50vmax] sm:h-[30vmax]' alt="" />
            
            
            ))}

            </Slider>
            

           

        </div>


    
    
    <div className='justify-evenly sm:items-start items-center sm:p-10' style={{width:'100%'}}>
  <div className="detailsBlock-1 my-5">
    <p className='sm:text-3xl text-2xl font-bold text-left text-zinc-800'>{product.name}</p>
    <p>Product # {product._id}</p>
    <hr className='text-zinc-100'/>
  </div>

  <div className="detailsBlock-2 p-[0.5vmax] mb-3 flex justify-start items-center">
  <ReactStars edit={false} value={product.ratings} size={20}/>
  {console.log(product.numofreviews)}
    <span>({product.numofreviews} Reviews)</span>
    
  </div>
  <hr className='text-zinc-100'/>

  <div className="detailsBlock-3">
    
    <h1 className='text-2xl text-semibold'>{`Rs. ${product.price}`}</h1>

    <div className="detailsBlock-3-1 flex items-center my-5">
      <div className="detailsBlock-3-1-1">
        <button className='p-2 bg-black text-white' onClick={decreasedQuantity}>-</button>
        <input readOnly type="" className='w-[4vmax] text-center p-2' value={quantity} />
        <button className='p-2 bg-black text-white mr-4' onClick={increasedQuantity}>+</button>
      </div>

      <button className='bg-indigo-500 px-4 py-2 rounded-full text-white' onClick={addToCarthandle}>Add to Cart</button>
      
    </div>
    <hr className='text-zinc-100'/>
  </div>

  <p className='my-4'>
    Status:{" "}
    <b className={product.Stock < 1 ? "text-red-500" : "text-green-500"}>
      {product.Stock < 1 ? "OutOfStock" : "InStock"}
    </b>
    
  </p>
  <hr className='text-zinc-100'/>
  <div className="detailsBlock-4 text-xl">
  Description : <p className='text-sm'>{product.description}</p>
</div>

<button className="bg-indigo-500 px-4 py-2 rounded-full my-4 text-white" onClick={submitReviewToggle}>Submit Review</button>
</div>
</div>

<h3 className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-zinc-100'} reviewHead font-bold text-xl text-center p-5 border-t`}>Reviews</h3>
<Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="flex flex-col gap-2">
              <Rating 
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
{product.reviews && product.reviews[0] ? (<div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-zinc-100'}`}>
    <div className="reviews flex p-6" style={{overflow:'auto'}}>
          {product.reviews.map((review)=><ReviewCard mode={props.mode} review={review}/>)}
        </div>
</div>) : (
 <p>no reviews</p>
)}</>)}

             
    </>
  )
}

export default ProductDetails
