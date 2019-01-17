import React, { Component } from 'react';
import Card from '../modules/Card.js';
import NewPost from '../modules/NewPost.js';
import io from 'socket.io-client';

class Feed extends Component {
	constructor(props) {
        super(props);

        this.socket = io('http://localhost:3000');

        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        this.socket.on('post', (story) => {
            this.setState({
                stories: [{story: story, comments: []}].concat(this.state.stories),
            });
        });

        document.title = "News Feed";
        this.getStories();

        this.socket.on('comment', (comment) => {
            let newState = Object.assign({}, this.state);
            let commentParent = newState.stories.find(x => x.story._id === comment.parent);
            commentParent.comments.push(comment);
            this.setState({newState});
        });
    }

    render() {
        const isLoggedIn = this.props.userInfo !== null;
        return (
            <div className="container feed-container">
                <div className="row">
                    <div className="col">
                        { isLoggedIn ? (
                            <NewPost 
                                addStory={this.addStory}
                            />
                        ) : (
                            <div>
                                You must be logged in to post.
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.stories ? (
                            this.state.stories.map(storyObj => (
                                <Card
                                    key={`Card_${storyObj.story._id}`}
                                    story={storyObj.story}
                                    userInfo={this.props.userInfo}
                                    comments = {storyObj.comments}
                                    addComment = {this.addComment}
                                />
                                )
                            )
                        ) : (
                            <div>
                                No stories!
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }  

    getStories = () => {
        fetch('/api/stories')
        .then(res => res.json())
        .then(
          storyObjs => storyObjs.reverse().map((storyObj) => {
            this.getComments(storyObj._id).then(
              comments => {
                this.setState({
                  stories: (this.state.stories).concat([{story: storyObj, comments: comments}])
                })
              }
            );
          })
        );
    };


    getComments = (storyId) => {
      return fetch(`/api/comment?parent=${storyId}`)
        .then(res => res.json())
    };

    addStory = (content) => {
        const body = { 'content': content };
        fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
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

export default Feed;