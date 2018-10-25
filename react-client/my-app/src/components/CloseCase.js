import React, { Component } from 'react';
import LoadingAnim from './LoadingAnim';

class CloseCase extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoading : false
        };
    }
    
    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        
        const self = this;
        console.log("Printing from handleSubmit");

        this.setState({isLoading: true});
        fetch('/api/case', {
          method: 'DELETE',
          body: data,
        })
        .then(res=>{return res.json()})
        .then( response=>{
            if(response.status !=200) throw "Error";
            
            self.setState({isLoading: false});
            console.log(response);
            alert(response.message);
        }).catch(function(reason){
            self.setState({isLoading: false});
            console.log(reason);
            alert("Upps something went wrong");
        });
    }

    render() {

        //adding style for hiding/showing
        let styleForm = this.state.isLoading ? {display: "none"} : {};

        return (
            <div>
                <h1>This is CloseCase page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>

                {this.state.isLoading?<LoadingAnim type="spinningBubbles" color="#000" ></LoadingAnim>:null}

                <form action="http://localhost:3001/api/case" method="delete" style={styleForm} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <p><input type="text" name="subject" placeholder="subject" required/></p>
                    <p><textarea name="description" placeholder="description" required/></p>
                    <label>CaseId</label>
                    <p><input type="text" name="caseId" value="00958389" /></p>
                    <p><button type="submit">Submit</button></p>
                </form>
            </div>
        )
    }
}

export default CloseCase;