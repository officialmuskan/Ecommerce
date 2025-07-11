import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"



import React from 'react'

export const getProduct = (keyword="", currentpage=1, price = [0, 25000], category, ratings = 0) =>async(dispatch)=> {
  try {
    dispatch({
        type:ALL_PRODUCT_REQUEST
    })
    // console.log("hello")
     let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // 🔁 Append category if selected
      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await axios.get(link);
      console.log(data)
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    })
    
  } catch (error) {
    console.log(error)
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response?.data?.message
    })
  }
}

export const ClearError = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

export const getProductDetails = (id) =>async(dispatch)=> {
    try {
      dispatch({
          type:PRODUCT_DETAILS_REQUEST
      })
      // console.log("hello")
      const {data} = await  axios.get(`/api/v1/product/${id}`)
      console.log(data)
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data.product
      })
      
    } catch (error) {
      dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload:error.response.data.message
      })
    }
  }
  

export const newReview = (rating, comment, productId) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, {rating, comment, productId}, config);
    console.log(data)
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data?.success,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
