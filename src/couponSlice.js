import { createSlice } from "@reduxjs/toolkit";
import { Coupons } from "./Coupons";

let couponSlice = createSlice( {
    name: "coupon",
    initialState: {
        code: " ",
        discount: 0,
        applied: false,
        message: " ",
    },
    reducers:{
        applyCoupon:(state, action) => {
            const enteredCode= action.payload.toUpperCase();
            if(Coupons[enteredCode]){
                state.code = enteredCode;
                state.discount= Coupons[enteredCode];
                state.applied= true;
                state.message = " Coupons " + enteredCode + " applied ! you got " + Coupons[enteredCode] +" % off" ;
            }
            else {
                state.message = "Invalid Coupon Code"
            }
        },
        resetCoupon: (state) => {
            state.code = " ";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        }
    }

})

//export the reducer then imported by component
export const { applyCoupon, resetCoupon } = couponSlice.actions;
//export the slice then imported by store 
export default couponSlice.reducer;