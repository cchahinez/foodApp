import React, { useContext, useState } from 'react'
import classes from '../../css/communComponents/Cart.module.css'
import Modal from './Modal'
import CartContext from '../store/cart-context'
import CartItem from '../body/CartItem'
import CheckOut from './CheckOut'

const Cart = (props) => {
  const [isCheckingOut,setIsCheckingOut]=useState(false)
  const [isSubmiting,setIsSubmiting]=useState(false)
  const [isSubmited,setIsSubmited]=useState(false)


  const cartCntx=useContext(CartContext)
  const totalAmount =`$${cartCntx.totalAmount.toFixed(2)}`
  const hasItems=cartCntx.items.length>0

  const cartITemRemove =(id)=>{
    cartCntx.removeitem(id)
  }
  const cartItemAdd=(item)=>{
    cartCntx.addItem(item)
  }

  const orderHanlder=()=>{
    setIsCheckingOut(true)
  }

  const hideForm=(data)=>{
    setIsCheckingOut(data)
  }

  const sumbitOrderHandler= async (userData)=>{
    setIsSubmiting(true)
       await fetch ('https://react-bdapp-default-rtdb.firebaseio.com/orders.json',{
          method :'POST',
          body :JSON.stringify({
            user:userData,
            orderedItems : cartCntx.items
          })
        })
        setIsSubmiting(false)
        setIsSubmited(true)
        cartCntx.clearCarts()
  }

  const cartItems =<ul className={classes['cart-items']}>
    {cartCntx.items.map((item)=>(
      <CartItem 
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartITemRemove.bind(null,item.id)}
      onAdd={cartItemAdd.bind(null,item)}
      />
    ))
  }</ul>


  const modalActions=<div className={classes.actions}>
  <button className={classes['button-alt']} onClick={props.onCloseCart}>
    close
  </button> 
  {hasItems && <button 
                className={classes.button}
                onClick={orderHanlder}>Order</button>}
</div>



    const cartContent = <React.Fragment>
      {cartItems}
        <div className={classes.total}> 
          <span>total amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckingOut && <CheckOut closeCheckOut={hideForm} onConfirm={sumbitOrderHandler}/>}
        {!isCheckingOut && modalActions}
                       </React.Fragment>

    const isSubmitingConent=<p>Sending order data...</p>

    const isSubmitedContent = <React.Fragment>
                   <p>Successfully sent the order ! </p>
                   <div className={classes.actions}>
                   <button className={classes.button} onClick={props.onCloseCart}>
                    close
                   </button> 
                    </div>
                           </React.Fragment> 
  return (
    <Modal onCloseCart={props.onCloseCart}>
        
        {!isSubmiting && !isSubmited && cartContent}
        {isSubmiting && isSubmitingConent}
        {!isSubmiting && isSubmited && isSubmitedContent}
    </Modal>
  )
}

export default Cart