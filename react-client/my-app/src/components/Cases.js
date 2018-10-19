import React, { Component } from 'react';
import axios from 'axios';
import tokenHelper from "../utils/tokenHelper";

class Cases extends Component {

    state = {
        Cases: []
    }

    componentDidMount() {
        const token = tokenHelper.getTokenCookie();
        axios.get(`http://localhost:3001/api/case`, { 'headers': { 'token': token }})
            .then(res => {
                const Cases = r-es.data;
                this.setState({ Cases });
            })
    }
    render() {
        return (
            <ul>
                {this.state.Cases.map(Case => <li>{Case.caseNumber} ,{Case.subject}</li>)}
            </ul>
        )
    }
}

export default Cases;