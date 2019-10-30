import React, { Component } from 'react';
import SingleComment from './SingleComment.js';
import NewPost from './NewPost.js';

class CommentsBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = this.props.userInfo !== null;
        return (
            <div className="card-footer">
                <div className="story-comments">
                    {this.props.comments.map(comment => (
                        <SingleComment
                            key={`SingleComment_${comment._id}`}
                            data={comment}
                        />
                    ))}
                    { isLoggedIn ? (
                        <NewPost
                            storyId={this.props.story._id}
                            comment={true}
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
