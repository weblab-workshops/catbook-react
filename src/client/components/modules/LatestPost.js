import React, { Component } from 'react';

class LatestPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <a className="story-creator card-title" href={'/profile/'+this.props.id}>
                        {this.props.name}
                    </a>
                    <p className="story-content card-text">
                        {this.props.latestPost}
                    </p>
                </div>
            </div>
        );
    }
}

export default LatestPost;