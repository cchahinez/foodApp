import React,{useRef, useState} from 'react'
import classes from '../../css/communComponents/CheckOut.module.css'

const isEmpty=(value)=>value.trim() ===''
const isNotPostal=(value)=>value.trim().length!==5


const CheckOut = (props) => {
    const [formInputsV,setFormInputsV]=useState({
        name :true,
        street:true,
        city:true,
        postal:true,
    })
    const nameRef=useRef()
    const streetRef=useRef()
    const postalRef=useRef()
    const cityRef=useRef()


    const hideCheckOut=()=>{
        props.closeCheckOut(false)
    }

    const confirmHandler=(event)=>{
        event.preventDefault()

        const enteredName= nameRef.current.value
        const enteredStreet= streetRef.current.value
        const enteredPostal= postalRef.current.value
        const enteredCity= cityRef.current.value

        const nameIsValid = !isEmpty(enteredName)
        const streetIsValid = !isEmpty(enteredStreet)
        const postalIsValid = !isNotPostal(enteredPostal)
        const cityIsValid = !isEmpty(enteredCity)

        setFormInputsV({
            name :nameIsValid,
            street:streetIsValid,
            postal :postalIsValid,
            city: cityIsValid
        })
        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid
        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name :enteredName,
            street:enteredStreet,
            postal : enteredPostal,
            city : enteredCity
        })

    }
        const nameClasses= `${classes.control} ${formInputsV.name ? '' : classes.invalid}`
        const streetClasses= `${classes.control} ${formInputsV.street ? '' : classes.invalid}`
        const postalClasses= `${classes.control} ${formInputsV.postal ? '' : classes.invalid}`
        const cityClasses= `${classes.control} ${formInputsV.city ? '' : classes.invalid}`



  return (
    <form onSubmit={confirmHandler}>
        <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        ref={nameRef}
        id='name'
        type ='text'
        required
        />

        </div>
        <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input 
        ref={streetRef}
        id='street'
        type ='text'
        required
        />

        </div>
        <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input 
        ref={postalRef}
        id='postal'
        type ='text'
        required
        />

        </div>
        <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input 
        ref={cityRef}
        id='city'
        type ='text'
        required
        />
        </div>

        <div className={classes.actions}>
        <button type='button'
        onClick={hideCheckOut}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default CheckOut