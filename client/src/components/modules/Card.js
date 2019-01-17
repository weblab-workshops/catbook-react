import React, { Component } from 'react';
import Story from './Story.js';
import CommentsBlock from './CommentsBlock.js';
import io from 'socket.io-client';

class Card extends Component {
    constructor(props) {
        super(props);

        this.socket = io('http://localhost:3000');


        this.state = {
            story: null,
            comments: []
        };
    }

    componentDidMount() {
        this.setState({
            story: this.props.story
        });

        this.socket.on('comment', (comment) => {
            this.setState({
                comments: this.state.comments.concat([comment])
            });
        });

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
                    addComment={this.addComment}
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
    };



    addComment = (parent, content) => {
        const body = {'parent': parent, 'content': content };
        fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
}

export default Card;