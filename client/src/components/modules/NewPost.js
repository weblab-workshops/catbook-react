import React, { Component } from 'react';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        //do we need to bind?
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            value: event.target.value 
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addStory(this.state.value);
        this.setState({
            value: '' 
        });
    }

    render() {
        return (
            <div className="input-group my-3">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="New Story" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                </form>
                <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-primary" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default NewPost;