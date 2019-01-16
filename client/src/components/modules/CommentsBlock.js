import React, { Component } from 'react';
import SingleComment from './SingleComment.js';
import NewComment from './NewComment.js';

class CommentsBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = this.props.userInfo !== null;
        return (
            <div className="card-footer">
                <div className="story-comments">
                    {this.props.data.map(comment => (
                        <SingleComment
                            key={`SingleComment_${comment._id}`}
                            data={comment}
                        />
                    ))}
                    { isLoggedIn ? (
                        <NewComment 
                            storyId={this.props.storyId}
                            addComment={this.props.addComment}
                        />
                    ) : (
                        <div>
                            You must be logged in to comment.
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CommentsBlock;