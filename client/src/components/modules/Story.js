import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Story extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-body">
                <Link to={"/profile/" + this.props.data.creator_id} className="story-creator card-title">
                    {this.props.data.creator_name}
                </Link>
                <p className="story-content card-text">
                    {this.props.data.content}
                </p>
            </div>
        );
    }
}

export default Story;