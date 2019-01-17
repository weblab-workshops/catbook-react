import React, { Component } from 'react';
import Story from './Story.js';
import CommentsBlock from './CommentsBlock.js';
import io from 'socket.io-client';

class Card extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="story card">
                <Story 
                    data={this.props.story}
                />
                <CommentsBlock
                    userInfo={this.props.userInfo}
                    data={this.props.comments}
                    storyId={this.props.story._id}
                    addComment={this.props.addComment}
                />
            </div>
        );
    }

}

export default Card;