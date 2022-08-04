import React, { Component } from "react";
import './Layout.css';
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerCloseHandler} />
                <main className="Content" >
                    {this.props.children}
                </main >

            </React.Fragment>

        );
    }
}
export default Layout;