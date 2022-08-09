import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axiosOrders) => {
    return class extends Component {
        state = {
            err: null
        }
        componentDidMount() {
            this.reqInterceptor = axiosOrders.interceptors.request.use(req => {
                this.setState({ err: null })
                return req;
            })
            this.resInterceptor = axiosOrders.interceptors.response.use(res => res, err => {
                this.setState({ err: err })
            });
        }
        componentWillUnmount() {
            console.log('will Unmount!', this.reqInterceptor, this.resInterceptor);
            axiosOrders.interceptors.request.eject(this.reqInterceptor);
            axiosOrders.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({ err: null })
        }
        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.err}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }

    }
}
export default withErrorHandler;