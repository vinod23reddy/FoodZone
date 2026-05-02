import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import couponReducer from "./couponSlice"
import orderReducer from "./orderSlice"

const store = configureStore ({
    reducer:{
        cart: cartReducer, 
        coupon : couponReducer,
        orders: orderReducer
    }
}

)
export default store;
