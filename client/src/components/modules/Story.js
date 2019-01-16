import React, { Component } from 'react';

class Story extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-body">
                <a className="story-creator card-title" href={'/profile/' + this.props.data.creator_id}>
                    {this.props.data.creator_name}
                </a>
                <p className="story-content card-text">
                    {this.props.data.content}
                </p>
            </div>
        );
    }
}

export default Story;