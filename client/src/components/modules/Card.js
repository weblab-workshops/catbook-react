import React, { Component } from 'react';
import Story from './Story.js';
import CommentsBlock from './CommentsBlock.js';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
          comments : []
        }
    }

    componentDidMount() {
      this.getComments(this.props.story._id).then((comments) => {
        this.setState({
          comments : comments
        });
      });
    }

    render() {
        return (
            <div className="story card">
                <Story
                    data={this.props.story}
                />
                <CommentsBlock
                    {...this.props}
                    comments = {this.state.comments}
                />
            </div>
        );
    }

    getComments = (storyId) => {
      return fetch(`/api/comment?parent=${storyId}`).then((res) => res.json());
    };

}

export default Card;
