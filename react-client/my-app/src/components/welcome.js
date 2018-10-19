import React, { Component } from 'react';
import Cases from './Cases';
import NavBar from './NavBar';

class Welcome extends Component {
    render() {
        return (
            <div>
                <NavBar urlAndText={{url: "http://localhost:3001/auth/logout", text: "Log out"}}/>
                <h1>This is the Welcome page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>
                <Cases />
            </div>
        )
    }

}

export default Welcome;