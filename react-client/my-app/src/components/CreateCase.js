import React, { Component } from 'react';
import NavBar from './NavBar';

class CreateCase extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        console.log("Printing from handleSubmit");

        fetch('/api/case', {
          method: 'POST',
          body: data,
        })
        // .then(res => res.json())
        .then( response=>{
            console.log("Server response withh: "+response);
        }).catch(function(reason){
            console.log("Error, reason: "+reason);
        });
    }

    render() {
        return (
            <div>
                <NavBar urlAndText={{url: "http://localhost:3001/auth/logout", text: "Log out"}}/>
                <h1>This is CreateCase page</h1>
                <p>This is a protected route that can only be viewed after user is authenticated</p>

                <form action="http://localhost:3001/api/case" method="post" onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <p><input type="text" name="subject" placeholder="subject"/></p>
                    <p><textarea name="description" placeholder="description"/></p>
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
                    <p><input type="text" name="sac" value="32926" /></p>
                    <p><input type="file" name="file1"/></p>
                    <p><input type="file" name="file2"/></p>
                    <p><button type="submit">Submit</button></p>
                </form>
            </div>
        )
    }
}

export default CreateCase;