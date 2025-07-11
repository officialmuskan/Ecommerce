import axios from "axios";
// import { ADD_TO_CART } from "../constants/cartConstant";
import { ADD_TO_CART, REMOVE_CART_ITEMS, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const addItemstoCart = (id, quantity)=>async(dispatch, getState)=>{
   
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    
}

export const removeItemstoCart = (id)=>async(dispatch, getState)=>{
   
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:REMOVE_CART_ITEMS,
            payload:id
                
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    
}



export const saveShippingInfo = (data) => (dispatch) => {
  localStorage.setItem("shippingInfo", JSON.stringify(data)); 
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
};
