import React, {useState, useEffect, useCallback} from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'

import MealItem from './MealsItem/MealItem';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://my-project-edf08-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json();
      const loadedMeals = []

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
      })
    }

    setMeals(loadedMeals)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, [])

  useEffect(()=> {
    fetchMeals()
  }, [fetchMeals])

    const mealsList = meals.map(meal =>
         <MealItem
         id={meal.id} 
         key={meal.id}
         name={meal.name}
         description={meal.description}
         price={meal.price}
         />
    )

    let content = <p>No meals found</p>
    
    if(meals.length > 0) {
      content = mealsList
    }

    if (error) {
      content = <p>{error}</p>;
    }
  
    if (isLoading) {
      content = <p>Loading...</p>;
    }
    
    return (
        <section className={classes.meals}>
            <Card>
             <ul>
                {content}
             </ul>
            </Card>
        </section>
    )
}


export default AvailableMeals