import { composeWithDevTools } from '@redux-devtools/extension'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
newOrderReducer
import { productReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/orderReducer';
userReducer
const reducer = combineReducers({
    products:productReducer,
    product:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
     myOrders: myOrdersReducer,
      orderDetails: orderDetailsReducer,
      newReview: newReviewReducer
})



let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk]
const store = createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store