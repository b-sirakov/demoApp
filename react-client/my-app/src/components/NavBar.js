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
                            <NavItem eventKey={1} href={this.props.urlAndText.url}>
                                {this.props.urlAndText.text}
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
    
}

export default NavBar;