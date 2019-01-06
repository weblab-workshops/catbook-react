import React, { Component } from 'react';
import Story from './Story.js';
import CommentsBlock from './CommentsBlock.js';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            story: null,
            comments: []
        };
    }

    componentDidMount() {
        this.setState({
            story: this.props.story
        })
        this.getComments(this.props.story._id);
    }

    render() {
        return (
            <div className="story card">
                <Story 
                    data={this.props.story}
                />
                <CommentsBlock
                    userInfo={this.props.userInfo}
                    data={this.state.comments}
                    storyId={this.props.story._id}
                    addComment={this.props.addComment}
                />
            </div>
        );
    }

    getComments = (storyId) => {
        fetch(`/api/comment?parent=${storyId}`)
        .then(res => res.json())
        .then(
            commentObj => {
                this.setState({ 
                    comments: commentObj
                });
            }
        );
    }
}

export default Card;