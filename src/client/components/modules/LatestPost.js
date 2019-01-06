import React, { Component } from 'react';

class LatestPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <a className="story-creator card-title" href={'/u/profile?' + this.props.userInfo._id}>
                        {this.props.userInfo.name}
                    </a>
                    <p className="story-content card-text">
                        {this.props.userInfo.last_post}
                    </p>
                </div>
            </div>
        );
    }
}

export default LatestPost;