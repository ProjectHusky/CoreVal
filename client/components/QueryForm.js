import React from "react";
import QueryListView from "./QueryList"
export default class QueryFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            resultArr: [],
            searchFinished:  false
        }
    }


    // Send request to firebase
    handleSubmit(evt) {
        evt.preventDefault();
        fetch(`/api/eval/${this.state.query}`, {
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((jsonResponse) => {
            this.setState({
                resultArr: jsonResponse.results,
                searchFinished: true
            })
            console.log(jsonResponse.results);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        console.log(this.state.resultArr);
        return (
            <div className="pt-3 pb-3"> 
                <form onSubmit={evt => this.handleSubmit(evt)} className="input-group">
                    <input type="text"
                        id="searchbar"
                        className="form-control"
                        value={this.state.query}
                        placeholder="Enter your professor or class"
                        // Update the professor when the user types
                        onChange={evt => {
                            this.setState({
                                query: evt.target.value,
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
                
                {/* Create a QueryListView which renders a bunch of Query Results */}
                {this.state.searchFinished 
                    ? <QueryListView results={this.state.resultArr}/> 
                    : "Welcome" }
            </div>
        );
    }
}
