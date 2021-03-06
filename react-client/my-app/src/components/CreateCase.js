import React, { Component } from 'react';
import NavBar from './NavBar';
import { rejects } from 'assert';
import LoadingAnim from './LoadingAnim';

class CreateCase extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOnFile = this.handleChangeOnFile.bind(this);
        this.state = {
            numOfFiles : 1,
            isLoading : false,
            isSuccess : false
        };
    }

    handleChangeOnFile(event){
        console.log(event.target.files);
        this.setState({numOfFiles: this.state.numOfFiles+1});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        console.log("Printing from handleSubmit");

        this.setState({isLoading: true});
        fetch('/api/case', {
          method: 'POST',
          body: data,
        })
        .then(res=>{return res.json()})
        .then( response=>{
            if(response.status !=201) throw "Error";

            this.setState({isLoading: false});
            console.log(response);
            alert(response.message);
        }).catch(function(reason){
            this.setState({isLoading: false});
            console.log(reason);
            alert("Upps something went wrong");
        });
    }

    componentWillMount(){
        
    }

    render() {
        // if (sac) { 

        // }

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
        let caseId = 40
        return (

            <div>
                <NavBar urlAndText={{url: "http://localhost:3001/auth/logout", text: "Log out"}}/>
                <h1>This is CreateCase page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>

                {this.state.isLoading?<LoadingAnim type="spinningBubbles" color="#000" ></LoadingAnim>:null}

                <form action="http://localhost:3001/api/case" method="post" style={styleForm} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <p><input type="text" name="subject" placeholder="subject" required/></p>
                    <p><textarea name="description" placeholder="description" required/></p>
                    <p>
                        <select name="environment">
                            <option value="Production">Production</option>
                            <option value="Non-production">Non-production</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </p>
                    <p>
                        <select name="severity">
                            <option value="Urgent">Urgent</option>
                            <option value="Important">Important</option>
                            <option value="Minor">Minor</option>
                        </select>
                    </p>
                    <label>Product</label>
                    <p><input type="text" name="id" value="a1E9E000000okpTUAQ" /></p>
                    <p><input type="text" name="os" value="a1D9E000001UpYsUAK" /></p>
                    <p><input type="text" name="version" value="a1F9E000000iMDzUAM" /></p>
                    <p><input type="text" name="sac" value={caseId} /></p>
                    {/* <p><input type="file" name="file1"/></p>
                    <p><input type="file" name="file2"/></p> */}
                    {listInputFiles}
                    <p><button type="submit">Submit</button></p>
                </form>
            </div>
        )
    }
}

export default CreateCase;