import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,

  
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants"



export const productReducer = (state={products:[]}, action) =>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
         return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:

            
            return {
                loading:false,
                products:action.payload.products,
                productCount:action.payload.productCount,
                resultperpage:action.payload.resultperpage,
                featuredProductsCount:action.payload.featuredProductsCount
                
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:

            
            return {
                ...state,
                error:null
            }
    
        default:
            return state
    }
}






export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};





export const productDetailsReducer = (state={product:{}}, action) =>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
         return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:

            
            return {
                loading:false,
                product:action.payload,
                
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:

            
            return {
                ...state,
                error:null
            }
    
        default:
            return state
    }
}