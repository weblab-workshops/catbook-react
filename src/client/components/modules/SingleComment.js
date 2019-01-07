import React, { Component } from 'react';

class SingleComment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment mb-2">
                <a className="comment-creator" href={'/profile/' + this.props.data.creator_id}>
                    {this.props.data.creator_name}
                </a>
                <span className="comment-content">
                    {' | ' + this.props.data.content}
                </span>
            </div>
        );
    }
}

export default SingleComment;