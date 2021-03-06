import React, {Component} from 'react';
import NavBar from './NavBar';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <NavBar urlAndText={{url: "http://localhost:3001/auth/axway", text: "Log in"}}/>
                <h1>Home</h1>
                <p>This is the Homepage where login options are listed - user is not yet authenticated</p>
            </div>
        );
    }
}

export default Home;
