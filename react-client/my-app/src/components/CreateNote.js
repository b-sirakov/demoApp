import React, { Component } from 'react';
import NavBar from './NavBar';
import { rejects } from 'assert';
import LoadingAnim from './LoadingAnim';

class CreateNote extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOnFile = this.handleChangeOnFile.bind(this);
        this.state = {
            numOfFiles : 1,
            isLoading : false
        };
    }

    handleChangeOnFile(event){
        console.log(event.target.files);
        this.setState({numOfFiles: this.state.numOfFiles+1});
    }
    
    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        
        const self = this;
        console.log("Printing from handleSubmit");

        this.setState({isLoading: true});
        fetch('/api/note', {
          method: 'POST',
          body: data,
        })
        .then(res=>{return res.json()})
        .then( response=>{
            if(response.status !=201) throw "Error";
            
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

        let listInputFiles = []
        for(let i=1;i<=this.state.numOfFiles;i++){
            if(i==this.state.numOfFiles){
                listInputFiles.push(
                    <p><input type="file" name={"file"+i} onChange={ this.handleChangeOnFile } /></p>
                )
            }else{
                listInputFiles.push(
                    <p><input type="file" name={"file"+i} /></p>
                )  
            }
            
        }

        //adding style for hiding/showing
        let styleForm = this.state.isLoading ? {display: "none"} : {};

        return (
            <div>
                <NavBar urlAndText={{url: "http://localhost:3001/auth/logout", text: "Log out"}}/>
                <h1>This is CreateCase page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>

                {this.state.isLoading?<LoadingAnim type="spinningBubbles" color="#000" ></LoadingAnim>:null}

                <form action="http://localhost:3001/api/note" method="post" style={styleForm} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <p><input type="text" name="subject" placeholder="subject" required/></p>
                    <p><textarea name="description" placeholder="description" required/></p>
                    <label>CaseId</label>
                    <p><input type="text" name="caseId" value="00958356" /></p>
                    {/* <p><input type="file" name="file1"/></p>
                    <p><input type="file" name="file2"/></p> */}
                    {listInputFiles}
                    <p><button type="submit">Submit</button></p>
                </form>
            </div>
        )
    }
}

export default CreateNote;