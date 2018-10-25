import React, {Component} from 'react';
import NavBar from './NavBar';

class TestRoute extends Component {

    componentDidMount() {
        // console.log(this.props.location.state);
    }

    render() {
        return (
            <div className="TestRoute">
                <NavBar urlAndText={{url: "http://localhost:3001/auth/axway", text: "Log in"}}/>
                <h1>THIS IS TEST ROUTE</h1>
                <p>This is the TEST ROUTE page</p>
            </div>
        );
    }
}

export default TestRoute;