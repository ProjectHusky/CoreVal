import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import QueryResultView from "QueryResult";
export default class QueryResultView extends React.Component {
    constructor(props) {
        super(props);
 

    }

    // Send request to firebase
    handleSubmit(evt) {
        evt.preventDefault();;
        let db = firebase.database();
        let path = "";
        // Fields are empty.
        if (!this.state.professor && !this.state.classAbrev) {
            alert("Empty fields");
        } else if (this.state.professor && !this.state.classAbrev) {
            console.log("This one");
            path = `/Professors/${this.state.professor}`
        } else  if (this.state.classAbrev && !this.state.professor) {
            path = `/Classes/${this.state.professor}`
        } else {
            path = `/Classes/${this.state.classAbrev}/${this.state.classAbrev}`
        }

        this.setState({
            resultPath: path
        })
    }

    render() {
        return (
            <div> 
               
            </div>

        );
    }
}
