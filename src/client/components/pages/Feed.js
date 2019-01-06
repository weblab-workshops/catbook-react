import React, { Component } from 'react';
import Card from '../modules/Card.js';
import NewPost from '../modules/NewPost.js';

class Feed extends Component {
	constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "News Feed";
    }

    render() {
        const isLoggedIn = this.props.userInfo !== null;
        return (
            <div className="container feed-container">
                <div className="row">
                    <div className="col">
                        { isLoggedIn ? (
                            <NewPost 
                                addStory={this.props.addStory}
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
                        {this.props.stories.map(story => (
                            <Card
                                key={`Card_${story._id}`}
                                story={story}
                                userInfo={this.props.userInfo}
                                addComment={this.props.addComment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;