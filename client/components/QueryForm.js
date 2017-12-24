import React from "react";
import QueryListView from "./QueryList"

export default class QueryFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuery: "",    // Keep track of what the user type
            currentQuery: "",   // Keep track of what the user last queried.
            resultArr: [],      // Keep track of the current results
            searchFinished:  false
        }
    }

    // Send request to our our api upon submit.
    handleSubmit(evt) {
        console.log(evt);
        evt.preventDefault();
        if (this.state.activeQuery.length >= 3) {
            fetch(`/api/eval/${this.state.activeQuery}`, {
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                this.setState({
                    currentQuery: this.state.activeQuery,
                    resultArr: jsonResponse.results,
                    searchFinished: true
                })
                console.log(jsonResponse.results);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="container mt-1"> 
                <div className="jumbotron">
                    <div>
                        <h1>CoreVal: A better way to browse evaluations </h1>
                    </div>
                </div>
                <div className="jumbotron">
                    <form onSubmit={evt => this.handleSubmit(evt)} className="input-group">
                        <input type="text"
                            id="searchbar"
                            className="form-control"
                            value={this.state.activeQuery}
                            placeholder="Enter a UW Professor or Class"
                            onChange={evt => {
                                this.setState({
                                    // Update the professor when the user types
                                    activeQuery: evt.target.value,
                                    searchFinished: false
                                }) 
                            }}
                        />
                        <span className="input-group-btn">
                            <button id="searchbutton" type="button" className="btn btn-success">
                                <span className="glyphicon glyphicon-search"> Search </span>
                            </button>
                        </span>
                    </form>
                    {/* Create a QueryListView which renders Query Results */}
                    {this.state.searchFinished 
                        ? <QueryListView query={this.state.currentQuery} results={this.state.resultArr}/> 
                        : "Welcome" }
                </div>
                <div className="footer">
                    CoreVal
                </div>
            </div>
        );
    }
}
