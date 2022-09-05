import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosOrders from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.4,
    cheese: 1.5,
    meat: 0.7
}
const BurgerBuilder = (props) => {
//    const ingredients = props.ingredients;
    const [ingredient, setIngredient] = useState(
        {
            ingredients: null,
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,

            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false

        });

    useEffect(() => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuu');
        axios.get('https://react-my-burger-6dcc8-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                setIngredient({ ingredients: res.data });
            })
            .catch(error => {
                setIngredient({ error: true });
            });

    },[ingredient.ingredients]);
   const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        setIngredient({ purchasable: sum > 0 });

    }
   const addIngredientHandler = (type) => {//////
        const oldCount = setIngredient.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...setIngredient.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = ingredient.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setIngredient({ totalPrice: newPrice, ingredients: updateIngredients });
        updatePurchaseState(updateIngredients);
    }
   const removeIngredientHandler = (type) => {
        const oldCount = setIngredient.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...setIngredient.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = ingredient.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setIngredient({ totalPrice: newPrice, ingredients: updateIngredients });
        updatePurchaseState(updateIngredients);
    }
   const purchaseHandler = () => {
        setIngredient({ purchasing: true });

    }
   const purchaseCancelHandler = () => {
        setIngredient({ purchasing: false });
    }
    const purchaseContinueHandler = (props) => {
        // alert('you continue');
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'David Horvitz',
        //         address: {
        //             street: 'Shahal 18',
        //             zipCode: '1234',
        //             country: 'Israel'
        //         },
        //         email: 'test@gmial.co.il'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axiosOrders.post('/orders.json', order)  //the base URL is at axios-orders.jsx & The second arg is the data being sent to the dataBase
        //     .then(res => {
        //         // console.log(res);
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false, purchasing: false })
        //     });
        
        
    }


    const disabledInfo = {
        ...setIngredient.ingredients
    };
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = setIngredient.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (setIngredient.ingredients) {

        burger = (
            <React.Fragment>
                <Burger ingredients={setIngredient.ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={setIngredient.purchasable}
                    ordered={purchaseHandler}
                    price={setIngredient.totalPrice} />
            </React.Fragment>
        );
        orderSummary = <OrderSummary
            ingredients={setIngredient.ingredients}
            price={setIngredient.totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />
    }
    if (setIngredient.loading) {
        orderSummary = <Spinner />;
    }
    return (
        <React.Fragment>
            <Modal show={setIngredient.purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );

}
export default withErrorHandler(BurgerBuilder, axiosOrders);


// class BurgerBuilder extends Component {

//     state = {
//         ingredients: null,
//         salad: 0,
//         bacon: 0,
//         cheese: 0,
//         meat: 0
//         ,
//         totalPrice: 4,
//         purchasable: false,
//         purchasing: false,
//         loading: false,
//         error: false
//     }

//     componentDidMount() {
//         axios.get('https://react-my-burger-6dcc8-default-rtdb.firebaseio.com/ingredients.json')
//             .then(res => {
//                 this.setState({ ingredients: res.data });
//             })
//             .catch(error => {
//                 this.setState({ error: true });
//             });
//     }
//     updatePurchaseState(ingredients) {
//         const sum = Object.keys(ingredients)
//             .map(igkey => {
//                 return ingredients[igkey];
//             })
//             .reduce((sum, el) => {
//                 return sum + el;
//             }, 0);
//         this.setState({ purchasable: sum > 0 });
//     }
//     addIngredientHandler = (type) => {//////
//         const oldCount = this.state.ingredients[type];
//         const updateCount = oldCount + 1;
//         const updateIngredients = {
//             ...this.state.ingredients
//         };
//         updateIngredients[type] = updateCount;
//         const priceAddition = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice + priceAddition;
//         this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
//         this.updatePurchaseState(updateIngredients);
//     }
//     removeIngredientHandler = (type) => {
//         const oldCount = this.state.ingredients[type];
//         if (oldCount <= 0) {
//             return;
//         }
//         const updateCount = oldCount - 1;
//         const updateIngredients = {
//             ...this.state.ingredients
//         };
//         updateIngredients[type] = updateCount;
//         const priceDeduction = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice - priceDeduction;
//         this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
//         this.updatePurchaseState(updateIngredients);
//     }
//     purchaseHandler = () => {
//         this.setState({ purchasing: true });

//     }
//     purchaseCancelHandler = () => {
//         this.setState({ purchasing: false });
//     }
//     purchaseContinueHandler = (props) => {
//         // alert('you continue');
//         // this.setState({ loading: true })
//         // const order = {
//         //     ingredients: this.state.ingredients,
//         //     price: this.state.totalPrice,
//         //     customer: {
//         //         name: 'David Horvitz',
//         //         address: {
//         //             street: 'Shahal 18',
//         //             zipCode: '1234',
//         //             country: 'Israel'
//         //         },
//         //         email: 'test@gmial.co.il'
//         //     },
//         //     deliveryMethod: 'fastest'
//         // }
//         // axiosOrders.post('/orders.json', order)  //the base URL is at axios-orders.jsx & The second arg is the data being sent to the dataBase
//         //     .then(res => {
//         //         // console.log(res);
//         //         this.setState({ loading: false, purchasing: false });
//         //     })
//         //     .catch(err => {
//         //         this.setState({ loading: false, purchasing: false })
//         //     });
//         const navigate = useNavigate();

//         this.props.navigate('/checkout')
//     }

//     render() {
//         const disabledInfo = {
//             ...this.state.ingredients
//         };
//         for (const key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key] <= 0
//         }
//         let orderSummary = null;
//         let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
//         if (this.state.ingredients) {

//             burger = (
//                 <React.Fragment>
//                     <Burger ingredients={this.state.ingredients} />
//                     <BuildControls
//                         ingredientAdded={this.addIngredientHandler}
//                         ingredientRemoved={this.removeIngredientHandler}
//                         disabled={disabledInfo}
//                         purchasable={this.state.purchasable}
//                         ordered={this.purchaseHandler}
//                         price={this.state.totalPrice} />
//                 </React.Fragment>
//             );
//             orderSummary = <OrderSummary
//                 ingredients={this.state.ingredients}
//                 price={this.state.totalPrice}
//                 purchaseCancelled={this.purchaseCancelHandler}
//                 purchaseContinued={this.purchaseContinueHandler} />
//         }
//         if (this.state.loading) {
//             orderSummary = <Spinner />;
//         }
//         return (
//             <React.Fragment>
//                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </React.Fragment>
//         );
//     }
// }
// export default withErrorHandler(BurgerBuilder, axiosOrders);