import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import QueryListView from "./QueryList"
export default class QueryFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professor : "",
            classAbrev: "",
            courseArr: []

        }
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
        
        let professor = this.state.professor;
        let dataTemp = this.state.courseArr.slice();
        db.ref(path).orderByValue().on("value", data => {
            data.forEach(function(data) {
                dataTemp.push(data.val());
            });
            this.setState({
                courseArr: dataTemp
            })
        });

    }

    render() {
        return (
            <div> 
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    <input type="text"
                        className="form-control"
                        value={this.state.professor}
                        placeholder="Enter your professor"
                        onChange={evt => {
                            this.setState({
                                professor: evt.target.value
                            }) 
                        }}
                    />
                </form>
                <QueryListView result={this.state.courseArr} professor={this.state.professor}/>
            </div>
        );
    }
}