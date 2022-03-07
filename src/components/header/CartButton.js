
import React,{useContext, useEffect, useState} from 'react'
import cartContext from '../store/cart-context'
import classes from '../../css/Header/CartButton.module.css'
import CartIcon from '../communComponents/CartIcon'

const CartButton = (props) => {
  const [btnIshighlighted, setbtnISHighlighted]=useState(false)
  const cartCtx =useContext(cartContext)
  const cartItemsNbr=cartCtx.items.reduce((currentNbr,item)=>{
    return currentNbr+item.amount
  },0)

  const {items}=cartCtx
  const btnClasses =`${classes.button} ${btnIshighlighted ? classes.bump : ''}`

  useEffect(()=>{
    if(cartCtx.items.length===0){
      return;
    }
    setbtnISHighlighted(true)
    
    const timer = setTimeout(()=>{
      setbtnISHighlighted(false)
    },300)

    return ()=>{
      clearTimeout(timer)
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}> 
            <CartIcon /> </span>
        <span> Your Cart</span>
        <span className={classes.badge}>{cartItemsNbr}</span>
    </button>
  )
}

export default CartButton