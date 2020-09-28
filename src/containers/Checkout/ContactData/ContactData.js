import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            PostCode: '',
            Country: ''
        },
        loading: false
    }
    // To stop re-rendering of page due to the <form> element we use (event) and event.preventDefault
    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients)

            this.setState({loading: true});
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: {
                    name: 'Daniel',
                    address: {
                        street: 'Canterbury',
                        suburb: 'Forest',
                        postCode: '3131',
                        country: 'Australia'
                    },
                    email: 'daniel@hotmail.com'
                },
                deliveryMethod: 'fastest'
            }
            axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                // console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                // console.log(error)
            });

    }

    render () {
        let form = (
            <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Your name' />
                    <input className={styles.Input} type='email' name='email' placeholder='Your email' />
                    <input className={styles.Input} type='text' name='street' placeholder='Your street' />
                    <input className={styles.Input} type='text' name='postalCode' placeholder='Your postal code' />
                    <input className={styles.Input} type='text' name='country' placeholder='Your country' />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                
            </div>
        )
    }

}

export default ContactData;