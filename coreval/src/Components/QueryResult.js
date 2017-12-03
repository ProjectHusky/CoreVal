import React from "react";
import firebase from "firebase/app";
import "firebase/database";
export default class QuerySearchView extends React.Component {
    render() {
        let info = this.props.courseInfo;
        return (
            <div>
                <p> {this.props.professor} </p>
                <p>{info.rating} {info.quarter} </p>
            </div>
        );
    }
}