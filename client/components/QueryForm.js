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
        evt.preventDefault();
        if (this.state.activeQuery.length >= 3 && this.state.activeQuery != this.state.currentQuery) {
            fetch(`/api/eval/${this.state.activeQuery}`, {
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                this.setState({
                    currentQuery: this.state.activeQuery,
                    resultArr: jsonResponse.results,
                    searchFinished: true
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="container-full mb-4" id="searchResults">
                <div className="container"> 
                    <form onSubmit={evt => this.handleSubmit(evt)} className="input-group">
                        <input type="text"
                            id="searchbar"
                            className="form-control mb-4"
                            value={this.state.activeQuery}
                            placeholder="Enter a UW Professor or Class. eg (CSE312) (Adam Blank)"
                            onChange={evt => {
                                this.setState({
                                    // Update the professor when the user types
                                    activeQuery: evt.target.value,
                                    searchFinished: false
                                }) 
                            }}
                        />
                        <span className="input-group-btn mb-4">
                            <button id="searchbutton" type="submit" className="btn">
                                <span className="glyphicon glyphicon-search"> Search </span>
                            </button>
                        </span>
                    </form>
                </div>
                {/* Create a QueryListView which renders Query Results */}
                {this.state.searchFinished
                    ? <QueryListView query={this.state.currentQuery} results={this.state.resultArr}/> 
                    : <div className="container">Home Page</div>}
            </div>
        );
    }
}
