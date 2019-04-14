import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavbarBrand, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({
                    user: firebaseUser
                })
            } else {
                this.setState({
                    user: null
                })
            }
        });
    }

    componentWillUnmount() {
        this.authUnregFunc();
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="#/">NVOLV</NavbarBrand>
                <Nav>
                    <NavItem>
                        {this.state.user ?
                            <Button onClick={() => {
                                firebase.auth().signOut();
                                this.compress();
                            }} color="danger">Log Out</Button>
                            :
                            <Link to="/signin">
                                <Button id="login" color="primary">Log In</Button>
                            </Link>}
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;
