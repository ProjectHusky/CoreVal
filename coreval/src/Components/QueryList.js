import React from "react";
import QueryResultView from "./QueryResult";
export default class QueryListView extends React.Component {
    render() {
        let queryResultArr = []
        let results = this.props.results;

        // No results.
        if (results.length === 0){
            return (
                <div>
                    <p> No Results </p>
                </div>
            )
        } else {
            // Create an array of Query Results View to render to the page.
            results.forEach((queryResult) => {
                for (var id in queryResult) {
                    let courseInfo = queryResult[id];
                    queryResultArr.push(<QueryResultView key={id} courseInfo={courseInfo}/>);
                }
            })
            
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
                            {queryResultArr}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}