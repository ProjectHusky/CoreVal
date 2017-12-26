import React from "react";

export default class QuerySearchView extends React.Component {

    styleRating(rating) {
        let ratingPerc = (rating / 5.0) * 100.0;
        let backgroundColor = "";
        if (rating <= 2) {
            backgroundColor = "#CC0000";
        } else if (rating <= 3) {
            backgroundColor = "#FF8800";
        } else if (rating <= 4) {
            backgroundColor = "#ffbb33"; 
        } else {
            backgroundColor = "#00C851";
        }
        let styles = {
            width: ratingPerc + "%",
            backgroundColor
        };

        return {
            rating: rating.toString(),
            ratingPerc,
            styles
        }
    }

    render() {
        let info = this.props.courseEval;
        let overallRating = this.styleRating(info.overall);
        let contentRating = this.styleRating(info.content);
        let contributionRating = this.styleRating(info.contribution);
        let effectivenessRating = this.styleRating(info.effectiveness);
        return (
            <div className="card mb-4">
                <div className="card-block">
                    <h4 className="card-title">{info.course} {info.quarter}</h4>
                    <h6 className="card-subtitle mb-2">{info.professor}</h6>
                    <div className="row card-text">
                        <div className="col-md-3">
                            <p className="mb-1">Overall</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={overallRating.rating} aria-valuemin="0" aria-valuemax="5" style={overallRating.styles}>
                                    <span className="sr-only">40% Complete (success)</span>
                                    {overallRating.rating}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <p className="mb-1">Content</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={contentRating.rating} aria-valuemin="0" aria-valuemax="5" style={contentRating.styles}>
                                    <span className="sr-only">40% Complete (success)</span>
                                    {contentRating.rating}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <p className="mb-1">Contribution</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={contributionRating.rating} aria-valuemin="0" aria-valuemax="5" style={contributionRating.styles}>
                                    <span className="sr-only">40% Complete (success)</span>
                                    {contributionRating.rating}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <p className="mb-1"> Effectivenes </p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={effectivenessRating.rating} aria-valuemin="0" aria-valuemax="5" style={effectivenessRating.styles}>
                                    <span className="sr-only">40% Complete (success)</span>
                                    {effectivenessRating.rating}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}