import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
    
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount = () => {
        console.log(this.props);
        // axios.get("https://react-myburgerwebsite.firebaseio.com/ingredients.json")
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // })
    }

    updatePurchaseState (ingredients) {
        
      const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce ((sum, el) => {
                return sum + el;
            }, 0);
        // this.setState({purchasable: sum > 0});   
        return sum > 0;        
    }

// addIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCount = oldCount + 1;
//     const updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type]=updatedCount;
//     const priceAddition = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients);

// }

// removeIngrdientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     // To be sure that if no ingredient represent, pressing less button do not give negative value
//     if (oldCount <= 0) {
//         return;
//     }
//     const updatedCount = oldCount - 1;
//     const updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type]=updatedCount;
//     const priceDeduction = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice - priceDeduction;
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients);
  
// }

purchaseHandler = () => {
    this.setState({purchasing: true})
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
    // alert('You continue!');
    // .json is added if we use firebase database and if we use other database such as mySQL it is not needed
//    this.setState({loading: true});
//     const order = {
//         ingredients: this.state.ingredients,
//         price: this.state.totalPrice,
//         customer: {
//             name: 'Daniel',
//             address: {
//                 street: 'Canterbury',
//                 suburb: 'Forest',
//                 postCode: '3131',
//                 country: 'Australia'
//             },
//             email: 'daniel@hotmail.com'
//         },
//         deliveryMethod: 'fastest'
//     }
//     axios.post('/orders.json', order)
//     .then(response => {
//         this.setState({loading: false, purchasing: false});
//         // console.log(response);
//     })
//     .catch(error => {
//         this.setState({loading: false, purchasing: false});
//         // console.log(error)
//     });
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    this.props.history.push(
        // {
        '/checkout'
        // pathname: '/checkout',
        // search: '?' + queryString
    // }
    );
}

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
            // disabledInfo is now true or false which then can be passed in BuildControls
        }

        let orderSummary = null;
                
        

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            ) ;  

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        
        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));