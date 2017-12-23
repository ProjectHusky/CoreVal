import React from "react";
import QueryResultView from "./QueryResult";
export default class QueryListView extends React.Component {
    render() {
        let resultArr = this.props.results;
        // No results.
        if (resultArr.length === 0){
            return (
                <div>
                    <p> No Results were found</p>
                </div>
            )
        } else {
            // Create an array of Query Results View to render to the page.
            console.log(resultArr[0]);
            let queryViewArr = [];
            for (let i = 0; i < resultArr.length; i++) {
                queryViewArr.push(<QueryResultView key={i} courseEval={resultArr[i]}/>);
            }
            // return (<h1> ENTER HERE</h1>);
            return (
                <div className="pt-3">
                    <table className="table table-striped table-sm table-condensed">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Quarter Taught</th>
                                <th>Number of People Surveyed</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queryViewArr}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
