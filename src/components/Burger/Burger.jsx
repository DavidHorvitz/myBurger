import React from "react";
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients).
        map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        }).
        reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    console.log(transformedIngredients);
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {transformedIngredients}
            {/* <BurgerIngredient type="salad" /> */}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
};

export default burger;         