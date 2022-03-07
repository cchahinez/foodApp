import React, { Fragment, useEffect, useState } from 'react'
import classes from '../../css/body/AvailableMeals.module.css'
import Card from '../communComponents/Card';
import SingleMeal from './SingleMeal';


const AvailableMeals = () => {
  const [meals,setMeals]=useState([])
  const [isLoading, setIsloeading]=useState(false)
  const [httpError,setHttpError]=useState()

  useEffect(()=>{

    const fetchMeals = async()=>{
    setIsloeading(true)
    const response =await fetch ('https://react-bdapp-default-rtdb.firebaseio.com/meals.json')
   
    if(!response.ok){
      throw new Error('something Went wrong')
    }
    
    const responseData = await response.json()
    
    const loeadedMeals=[]
    for (const key in responseData){
      loeadedMeals.push ({id : key, 
        name : responseData[key].name,
        description :responseData[key].description,
        price : responseData[key].price,})
    }
    setMeals(loeadedMeals)
    setIsloeading(false)
    }
    
    fetchMeals().then().catch((error)=>{
      setIsloeading(false)
      setHttpError(error.message)
    })
   
  },[])

  if(isLoading){
    return <section className={classes.mealsLoading}> Loeading ...</section>
  }

  if(httpError){
    return <section className={classes.mealsError}>{httpError}</section>
  }


  const mealsOn =(meals.map((meal)=><SingleMeal 
    id={meal.id}
    key={meal.id} 
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />))
   
  return (
      <section className={classes.meals}>
          <Card>
            {mealsOn}
            
          </Card>
      </section>
  )
}

export default AvailableMeals