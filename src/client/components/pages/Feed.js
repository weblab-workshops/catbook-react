import React, { Component } from 'react';

class Feed extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            form: {
                user: '',
                story: ''
            }
        };
    }

    // handleSubmit = event => {
    //     event.preventDefault();
    //     this.props.handleData.addEntry(PAGE, this.state.form);
    //     this.setState({
    //         form: {
    //             user: '',
    //             story: ''
    //         }
    //     });
    // }

    render() {
        return (
            <div className="container feed-container">
                I am duck pls feed me quack
            </div>
        );
    }
}

export default Feed;