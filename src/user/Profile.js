import React, { Component } from 'react'
import axios from 'axios'
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        };
    }

    componentDidMount() {
    }

    render() {
        console.log("in profile")
        return (
            <div>
                <p>Hi, I'm {this.state.user.name}</p>
            </div>
        )
    }
}

