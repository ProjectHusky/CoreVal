import React from "react";
import firebase from "firebase/app";
import "firebase/database";
export default class QuerySearchView extends React.Component {
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
        db.ref(path).orderByValue().on("value", function(data) {
            data.forEach(function(data) {
                let courseObj = data.val(); // Information about the class
                let html = '';
                for (var obj in courseObj) {
                    let courseInfo = courseObj[obj];
                    console.log(courseInfo);
                    html = `<div>
                        <p>${professor}  ${courseInfo.quarter},  Based off ${courseInfo.numSurveyed} evals</p> <p>`
                    for (var key in courseInfo.rating) {
                        let catRate = courseInfo.rating[key];
                        html += `${key} ${catRate} \n`
                    }
                    html += `</p> </div>`
                }
                document.getElementById("results").innerHTML += html;
            });
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
            </div>
        );
    }
}
