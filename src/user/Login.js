
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userLogin: {}
        }
    }


    loginHandler = () => {
        console.log("you're in login handel")
        this.props.login(this.state.userLogin);
    }


    changeHandler = (e) => {
        let temp = { ...this.state.userLogin }
        temp[e.target.name] = e.target.value;

        this.setState({
            userLogin: temp
        })
        console.log("temp");
        console.log(temp);
        console.log("user");
        console.log(this.state.userLogin);
    }

    render() {

        return (
            <div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h1> Login </h1>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form style={{ backgroundColor: " #f0f0f0" }}
                        >
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-user"></i></span>
                                </div>
                                <input className="form-control" type="email" name="emailAddress" onChange={this.changeHandler} placeholder="Email Address" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input className="form-control" type="password" name="password" onChange={this.changeHandler} placeholder="Password" />
                            </div>

                            <Button variant="dark" block onClick={this.loginHandler}> Login</Button>
                            <div className="message">
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        )
    }
}
