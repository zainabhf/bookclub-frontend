
import React, { Component } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'

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

            <div>

                <Container>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>


                    <Button variant="primary" block onClick={this.loginHandler}>Login</Button>
                </Container>

            </div>
        )
    }
}