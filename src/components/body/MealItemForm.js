import React,{useRef, useState} from 'react'
import classes from '../../css/body/MealItemForm.module.css'
import Input from '../communComponents/Input'

const MealItemForm = (props) => {
  const [amountValidity,setAmoutValidity]=useState(true)
  const amountInputRref=useRef()

  const submitHandler=(event)=>{
    event.preventDefault()
    const enteredAmount= amountInputRref.current.value
    const enteredAmountNbr=+enteredAmount

    if(enteredAmount.trim().length===0 || enteredAmountNbr<1 || enteredAmountNbr>10)
      {return}
    props.onAddToCart(enteredAmountNbr)
  }
  return (
   <form className={classes.form}>
        <Input 
          ref={amountInputRref}
          label ="Amount" 
          input={{
            id:'amount'+props.id,
            type :'number',
            min: '1',
            max :'10',
            step : '1',
            defaultValue : '1'
        }}/>
        <button onClick={submitHandler}> + Add</button>
        {!amountValidity && <p>PLEASE INPUT A VALID AMOUNT 1-10</p>}
   </form>
  )
}

export default MealItemForm