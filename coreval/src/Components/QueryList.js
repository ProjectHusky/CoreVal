import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import QueryResultView from "./QueryResult";
export default class QueryListView extends React.Component {
    render() {
        let queryResult = []
        let dataArr = this.props.result;
        if (!dataArr){
            return (
                <div>
                    Nothing
                </div>
            )
        }
            dataArr.forEach(data => {
                let courseObj = data; // Information about the class
                for (var obj in courseObj) {
                    let courseInfo = courseObj[obj];
                    queryResult.push(<QueryResultView key={obj} courseInfo={courseInfo}/>);
                }
            })
        
        return (
            <div> 
                {queryResult}
            </div>
        );
    }
}