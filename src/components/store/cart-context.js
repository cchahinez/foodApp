import React from "react";

const CartContext =React.createContext({
    items :[],
    totalAmount :0,
    addItem:(item)=>{},
    removeitem :(id)=>{},
    clearCarts :()=>{}

})

export default CartContext