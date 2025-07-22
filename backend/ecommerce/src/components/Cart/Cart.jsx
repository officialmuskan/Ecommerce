import React from 'react'
import {useDispatch, useSelector} from "react-redux"
// {useDispatch}
import {addItemstoCart, removeItemstoCart} from "../../actions/cartActions"
import CardItem from './CardItem'
import { Link, useNavigate } from 'react-router-dom'
useNavigate
Link


const Cart = (props) => {
const nav = useNavigate()
    const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const deleteCartItems = (id)=>{
    dispatch(removeItemstoCart(id));
  };
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemstoCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemstoCart(id, newQty));
  };
  const checkoutHandler = () => {
   nav("/login?redirect=shipping");
  };

  return (
    <>
  {cartItems.length === 0 ? (
        <div className="emptyCart flex flex-col justify-center items-center">
          

          <h3 className='font-bold text-lg'>No Product in Your Cart</h3>
          <Link to="/product">View Products</Link>
        </div>
      ) :(
         <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-zinc-100'} cartPage sm:p-[5vmax] p-0` }>
            <div className="cartHeader bg-indigo-500 width-[90%] m-auto text-white grid sm:text-[2vmax] sm:grid-cols-[4fr_1fr_1fr] grid-cols-[2fr_1fr_1fr] font-semibold">
              <p className='m-[10px]'>Product</p>
              <p className='m-[10px]'>Quantity</p>
              <p className='m-[10px] text-end'>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item) =>
            <div className="cartContainer grid sm:grid-cols-[4fr_1fr_1fr] grid-cols-[2fr_1fr_1fr]">
                <CardItem item={item} deleteCartItems={deleteCartItems} />
                  
                <div className='flex items-center sm:h-[8vmax] h-[20vmax]' key={item.product}>
                      <button className='sm:p-[0.5vmax] p-[1.5vmax] m-2' onClick={()=>decreaseQuantity(item.product, item.quantity
                      )}>
                      -
                  </button> 
                  <input className='sm:w-[3vmax]  w-[4.5vmax]' type="number" value={item.quantity} readOnly/>
                  <button className='sm:p-[0.5vmax] p-[1.5vmax] m-0' onClick={()=>increaseQuantity(item.product, item.quantity,item. stock)}>
                      +
                  </button>
                </div>
                <p className='flex sm:p-[0.5vmax] p-[1.5vmax] sm:h-[8vmax] h-[20vmax] items-center  text-[2vmax] sm:text-[1.5vmax] font-semibold justify-end'>{`₹${item.price * item.quantity}`}</p>
                


            </div>)}
            <div className="cartGrossProfi  grid sm:grid-cols-[0fr_2fr] grid-cols-[2fr_1.2fr] ">
              <div></div>
              <div className="cartGrossProfitBox border-t p-[2vmax] font-bold sm:text-[1.5vmax] flex justify-between mx-[1vmax] my-[1vmax]">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn text-white  flex justify-end  sm:text-[1.6vmax]">
                <button className='sm:w-[20%] w-[100%] bg-indigo-500 mx-[1vmax] my-[1vmax] rounded-full px-[2vmax] py-2 sm:py-[0.8vmax] ' onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>

    </div>

      ) } 
    </>
   
  )
}

export default Cart