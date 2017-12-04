import React from "react";
import firebase from "firebase/app";
import "firebase/database";
export default class QuerySearchView extends React.Component {
    render() {
        let info = this.props.courseInfo;
        console.log(info);
        let rating = info.rating;
        for (var category in rating) {
            console.log(category);
            console.log(typeof rating[category]);
            rating[category] = parseFloat(rating[category].replace("'",""));
        }
        return (
            <tr>
                <td>{info.course}</td>
                <td>{info.quarter}</td>
                <td>{info.numSurveyed}</td>
                <td>
                    <table className="table table-sm table-condensed">
                        <thead>
                            <td>Overall</td>
                            <td>Content</td>
                            <td>Contribution</td>
                            <td>Effectiveness</td>
                        </thead>
                        <tbody>
                            <td>{rating.overall}</td>
                            <td>{rating.content}</td>
                            <td>{rating.contribution}</td>
                            <td className="ratingTable">{rating.effective}</td>
                        </tbody>
                    </table>
                </td>
                    
                    {/* {info.rating.overall}</td> */}
            </tr>
        );
    }
}