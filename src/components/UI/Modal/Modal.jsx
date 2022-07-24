import React, { Component } from "react";
import './Modal.css'
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }
    componentDidUpdate(){
        console.log('[Model] willUpdate');
    }
    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    Test Modal
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
};
export default Modal;