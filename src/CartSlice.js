import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers: {
        addToCart:(state, action) =>{
            let existingItem = state.find(item=> item.name === action.payload.name)
            if(existingItem){
                existingItem.quantity = existingItem.quantity+1;
            }
            else {
                let finalObject= {...action.payload,quantity:1}

                state.push(finalObject);
            }

        },

        removeCart:(state, action)=>{
            let index =state.findIndex(item=> item.name === action.payload.name)
            if( index != -1){
                state.splice(index, 1);
            }

        }, 

        increaseQuant:(state, action)=>{
            let item = state.find(item => item.name === action.payload.name)
            if(item){
                item.quantity+=1;
            }
        }, 

        decreaseQuant:(state, action)=>{
            let item = state.find(item => item.name === action.payload.name)
            if(item){
                if(item.quantity > 1){
                item.quantity-=1;
                }
                else {
                    //remove Item if quantity becomes 0
                    return state.filter(
                    item => item.name !== action.payload.name
                    );
                }
            }
        }, 

        clearCart : () => []

    }


});

//export the reducer so that component can import 
export const {addToCart, removeCart, increaseQuant, decreaseQuant, clearCart}= cartSlice.actions;
//export the slice so that store can import 
export default cartSlice. reducer;