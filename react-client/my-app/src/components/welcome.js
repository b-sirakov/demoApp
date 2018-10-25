import React, { Component } from 'react';
import Cases from './Cases';
import NavBar from './NavBar';
import axios from 'axios';
import tokenHelper from "../utils/tokenHelper";
import CloseCase from './CloseCase';

class Welcome extends Component {

    state = {
        areProductsExtracted : false,
        productID = this.props.productID
    }

    componentDidMount() {
        const token = tokenHelper.getTokenCookie();
        // this.props.history.push('/testRoute', { id: 10, color: 'green' }) ;
        // axios.get(`http://localhost:3001/api/case`, { 'headers': { 'token': token }})
        //     .then(res => {
        //         const Cases = res.data;
        //         this.setState({ Cases });
        //     });
    }

    render() {
        // if (productID){
        //     return <CreateCase productID = {{productID}} sac = {{}}>
        // } else {
        return (
            <div className="welcome">
                <NavBar urlAndText={{url: "http://localhost:3001/auth/logout", text: "Log out", areProdExt: this.state.areProductsExtracted}}/>
                <h1>This is the Welcome page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>
                <p><a href="/testRoute">test-route</a></p>
                <CloseCase />
                <Cases />
            </div>
        )
        

    }

}

export default Welcome;