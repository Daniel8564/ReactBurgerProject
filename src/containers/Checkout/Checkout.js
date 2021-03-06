// const { Component } = require("react");

import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0

    //     } 
    

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // each key should design to have this format ['salad', '1'], addin + behind param convert it to a number
    //         if(param[0] === 'price') {
    //             price=param[1]
    //         } 
    //         else {
    //             ingredients[param[0]] = +param[1]
    //         }
           
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();   
    } 

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    } 

    render () {
        return (
            <div>
                <CheckoutSummary
                     ingredients={this.props.ings}
                     checkoutCancelled={this.checkoutCancelledHandler}
                     checkoutContinue={this.checkoutContinuedHandler}
                 />
                 <Route
                     path={this.props.match.path + '/contact-data'}
                    //  component={ContactData} 
                    // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                    component={ContactData}
                    />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps) (Checkout);