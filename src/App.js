import React, {useState} from "react";
import DescriptionTable from "./components/body/DescriptionTable";
import MealsList from "./components/body/MealsList";
import Cart from "./components/communComponents/Cart";
import Header from "./components/header/Header";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [cartIsOn, setCartIsOn] =useState(false)

  const showCart=()=>{
    setCartIsOn(true)
  }

  const hideCart=()=>{
    setCartIsOn(false)
  }

  return (
    <CartProvider>
      {cartIsOn && <Cart onCloseCart={hideCart}/>}
      <Header onShowCart={showCart} />
      <main>
        <DescriptionTable />
        <MealsList />
      </main>
    </CartProvider>
  );
}

export default App;
