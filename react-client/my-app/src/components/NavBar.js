import React, { Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './NavBar.css';

class NavBar extends Component {
    constructor() {
        super();
        this.state = { isAuthenticated: false , user: null, token: ""}
    }

    onLogin() {

    }
    
    render() {
        return (
            <div>
                <Navbar className="navigation" collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">Axway Sphere Portal</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="http://localhost:3001/auth/axway">
                                Log in
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
    
}

export default NavBar;