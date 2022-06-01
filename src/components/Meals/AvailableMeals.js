import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
  const [meals, setMeals ] = useState([])
  const [isLoading,setIsloding] = useState(true)
  const [httpErrors ,setHttpErrors] = useState(null)
  useEffect(() => {
    const fetchMeals  = async() => {
      const response  = await fetch('https://meals-app-f803f-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error('SomeThing went wrong')
      }
      const responseDate = await response.json()
      const loadeMeals = []
      console.log(responseDate)

      for(const i  in responseDate){
        loadeMeals.push({
       id:i,
       name:responseDate[i].name,
       description:responseDate[i].description,
       price:responseDate[i].price,
        })
      }
      setMeals(loadeMeals)
      setIsloding(false)
    }
  
    fetchMeals().catch((error) => {
      setIsloding(false)
      setHttpErrors(error)
    })

  

  },[])
  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section> 
  }
  if(httpErrors) {
    return <section className={classes.MealsError}>
    <p>{httpErrors}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
