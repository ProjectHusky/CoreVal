import React from "react";

export default class QuerySearchView extends React.Component {
    render() {
        let info = this.props.courseEval;
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
                            <td>{info.overall}</td>
                            <td>{info.content}</td>
                            <td>{info.contribution}</td>
                            <td className="ratingTable">{info.effectiveness}</td>
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}