import React from "react";

export default class QuerySearchView extends React.Component {
    render() {
        let info = this.props.courseInfo;
        let rating = info.rating;
        for (var category in rating) {
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
            </tr>
        );
    }
}