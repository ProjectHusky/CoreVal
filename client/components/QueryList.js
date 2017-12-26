import React from "react";
import QueryResultView from "./QueryResult";
export default class QueryListView extends React.Component {
    render() {
        let resultArr = this.props.results;
        if (resultArr.length === 0){
            return (
                <div className="container">
                    <p> <strong>{resultArr.length}</strong> search results were found for <strong>{this.props.query}</strong></p>
                </div>
            )
        } else {
            // Create an array of Query Results View to render to the page.
            let queryViewArr = [];
            for (let i = 0; i < resultArr.length; i++) {
                queryViewArr.push(
                    <QueryResultView key={i} courseEval={resultArr[i]}/>
                );
            }
            return (
                <div className="container">
                    <p> <strong>{resultArr.length}</strong> search results were found for <strong>{this.props.query}</strong></p>
                    {queryViewArr}
                </div>
            );
        }
    }
}
