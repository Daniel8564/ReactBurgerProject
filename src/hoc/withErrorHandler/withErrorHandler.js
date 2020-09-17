import React, { Component } from 'react';
import Model from '../../components/UI/Model/Model';
import Aux from '../Auxiliary/Auxiliary';

// We change the componentDidMount to componentWillMount to have error funtion in our post as didMount rendered after all child components

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state= {
            error: null
        }
        // componentDidMount () {
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Model
                         show={this.state.error}
                         modelClosed={this.errorConfirmedHandler}>
                       {this.state.error ? this.state.error.message : null} 
                    </Model>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErrorHandler; 