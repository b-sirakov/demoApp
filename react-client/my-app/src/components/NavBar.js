import React, { Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './NavBar.css';

class NavBar extends Component {
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

// "https://login-dev.axway.com/auth/realms/Axway/protocol/openid-connect/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Faxway%2Fredirect&scope=axway_customer%20axway_employee&client_id=amplify-apimanager"

export default NavBar;