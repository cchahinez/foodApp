import React,{useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartstate={
  items:[],
  totalAmount :0
}

const cartReducer=(state,action)=>{
  if(action.type ==='ADD'){

    const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount
    const existingCardItemIndex=state.items.findIndex(item=> item.id === action.item.id)

    const existingCartItem =state.items[existingCardItemIndex]
    
    let updatedItemss;

    if(existingCartItem){
     const  updatedItem={
        ...existingCartItem,
        amount : existingCartItem.amount + action.item.amount
      }
      updatedItemss=[...state.items]
      updatedItemss[existingCardItemIndex]=updatedItem
    }
    else{
      updatedItemss=state.items.concat(action.item)
    }

    return {
      items:updatedItemss,
      totalAmount:updatedTotalAmount
    }
  }

  if(action.type==='REMOVE'){
  
    const existingCardItemIndex=state.items.findIndex((item)=> item.id === action.id)

    const existingItem = state.items[existingCardItemIndex]
    const updatedTotalAmount=state.totalAmount - existingItem.price
    let updatedItemss;

    if(existingItem.amount===1){
      updatedItemss=state.items.filter((item)=> item.id !== action.id)
    }else{
      const updatedItem ={...existingItem,amount : existingItem.amount-1}
      updatedItemss=[...state.items]
      updatedItemss[existingCardItemIndex]=updatedItem
    }
    return{
      items :updatedItemss,
      totalAmount:updatedTotalAmount
    }
  
  
  }
  if(action.type ==='CLEAR'){
    return defaultCartstate
  }

  return defaultCartstate
}


const CartProvider = (props) => {
  const [cartState, setCartState]=useReducer(cartReducer,defaultCartstate)

    const addItemToCart=(item)=>{
        setCartState({type:'ADD',item:item})

    }
    const omitItemFromCart=(id)=>{
        setCartState({type:'REMOVE',id:id})
    
    }

    const clearCart=()=>{
      setCartState({type:'CLEAR'})
    }

    const cartContext ={
        items :cartState.items,
        totalAmount :cartState.totalAmount,
        addItem: addItemToCart,
        removeitem : omitItemFromCart,
        clearCarts : clearCart
    }
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider