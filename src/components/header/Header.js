import React,{Fragment} from 'react'
import classes from '../../css/Header/Header.module.css'
import meals from '../../assets/meals.jpg'
import CartButton from './CartButton'

const Header = (props) => {
  return   <Fragment>
    <header className={classes.header}>
        <h1>Food Ordering</h1>
        <CartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
        <img 
        src={meals} 
        alt="haya naklou">
        </img>
    </div>
  </Fragment>
}

export default Header