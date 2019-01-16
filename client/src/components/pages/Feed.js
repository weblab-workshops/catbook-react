import React, { Component } from 'react';
import Card from '../modules/Card.js';
import NewPost from '../modules/NewPost.js';
import io from 'socket.io-client';

class Feed extends Component {
	constructor(props) {
        super(props);

        this.socket = io('http://localhost:3000');

        this.socket.on('post', (story) => {
            this.getStories();
        });

        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        document.title = "News Feed";
        this.getStories();
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
                            this.state.stories.reverse().map(story => (
                                <Card
                                    key={`Card_${story._id}`}
                                    story={story}
                                    userInfo={this.props.userInfo}
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
            storyObj => {
                this.setState({ 
                    stories: storyObj
                });
            }
        );
    }

    addStory = (content) => {
        const body = { 'content': content };
        fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}

export default Feed;