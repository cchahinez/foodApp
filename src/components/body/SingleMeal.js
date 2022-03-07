import React, {useContext} from 'react'
import classes from '../../css/body/SingleMeal.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../store/cart-context'

const SingleMeal = (props) => {
  const cartCntx=useContext(CartContext)
  const price = `$${props.price.toFixed(2)}`

    const addToCart=(amount)=>{
      cartCntx.addItem({
        id:props.id,
        name:props.name,
        amount:amount,
        price :props.price
      })
    }
  return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.decription}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCart}/>
        </div>
    </li>
  )
}

export default SingleMeal