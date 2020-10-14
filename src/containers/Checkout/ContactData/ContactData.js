import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { toIdentifier } from 'webpack/lib/Template';

class ContactData extends Component {
    state = {
        orderForm: {
           
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            suburb: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Suburb'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
           
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
                
            },
            
        },
        formIsValid: false,
        loading: false
    }
    // To stop re-rendering of page due to the <form> element we use (event) and event.preventDefault
    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients)

            this.setState({loading: true});
            const formData = {};
            for (let fromElementIdentifier in this.state.orderForm) {
                formData[fromElementIdentifier] = this.state.orderForm[fromElementIdentifier].value;
            }
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value)
        const updatedorderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedorderForm[inputIdentifier]
        } 
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedorderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(inputIdentifier in updatedorderForm) {
            formIsValid = updatedorderForm[inputIdentifier].valid && formIsValid
        }
        // console.log(updatedFormElement);
        // console.log(formIsValid);
        
        this.setState({orderForm: updatedorderForm, formIsValid: formIsValid});
    }


    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    
                    {formElementArray.map(formElement => (
                        <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button 
                        btnType='Success' 
                        // clicked={this.orderHandler}
                        disabled={!this.state.formIsValid}
                        >
                            ORDER
                    </Button>
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