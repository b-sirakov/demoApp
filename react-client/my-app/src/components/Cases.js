import React, { Component } from 'react';
import axios from 'axios';

class Cases extends Component {

    state = {
        Cases: []
    }

    componentDidMount() {
        
        const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpdDQzQmhoaTFMM3EzNHdtaFJ4QlItNHVORzVBYWdsZjFjNjZLbUVFRVZzIn0.eyJqdGkiOiIxY2VkYTBmNS1mYzM2LTQ1NGQtOWRhMC01YWNkN2I0MjlkZjEiLCJleHAiOjE1Mzk3MzQ5MjQsIm5iZiI6MCwiaWF0IjoxNTM5Njk4OTI0LCJpc3MiOiJodHRwczovL2xvZ2luLWRldi5heHdheS5jb20vYXV0aC9yZWFsbXMvQXh3YXkiLCJhdWQiOiJhbXBsaWZ5LWFwaW1hbmFnZXIiLCJzdWIiOiI2NGU3ZDYyZC05Y2I1LTQ3ZWMtYjY1OC0yNzQyNjllMTQwYjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhbXBsaWZ5LWFwaW1hbmFnZXIiLCJhdXRoX3RpbWUiOjE1Mzk2OTg5MjQsInNlc3Npb25fc3RhdGUiOiJkOWQ1OWViNy0xMDA0LTQ3NjgtOWI3Yy0wZjEzZWIzZWQ5MDgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImF4d2F5X2VtcGxveWVlIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IkFsZWtzYW5kYXIgRG9uZXYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG9uZXZAYXh3YXkuY29tIiwiZ2l2ZW5fbmFtZSI6IkFsZWtzYW5kYXIiLCJmYW1pbHlfbmFtZSI6IkRvbmV2IiwiZW1haWwiOiJhZG9uZXZAYXh3YXkuY29tIn0.Px9Snofv0STmgSLr9Jb4tpK9nIWFOoL3DNpLTVcvIhw7n9CcU3RlEfxnTtD426iNKTqWR6uNq6xhK2okV-N-dYSjt1NCfNiYIWkvqcCVn9j0lOC2jh6EdEYD0QXa1moeTmMn1oDdeq17cmg27EBmDlYnapNPzZccNzlkyi1EAp3nyeiarA2onOQ4UdEHyAlbXH2eIhWQjrUWH9JX8UpFaIyFH8sGLoSIIjrg9B41snNZjXvJxt8h_qX0Z1Xe7npEvE52UOOjaOXfm1OUUtkd13ihrke_SxUEt38PadUzKF-q8rpTTZCofXwUn6e-1gutifp6LMg7pboMKKlbta4-8g';

        axios.get(`http://localhost:3001/api/case`, { 'headers': { 'token': token }})
            .then(res => {
                const Cases = res.data;
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