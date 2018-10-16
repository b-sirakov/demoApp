import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Welcome extends Component {
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
                            <NavItem eventKey={1} href="http://localhost:3001/auth/logout">
                                Log out
                        </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}

export default Welcome;