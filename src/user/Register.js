import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newUser: {},
            errorMessage: null,
            successMessage:null


        }
    }

    registerHandler = () => {
        if (this.checkPassword(this.state.newUser["password"], this.state.newUser["confirm"])) {
            this.props.register(this.state.newUser);
            this.setState({
                successMessage: "Welcome to our famile"
            })
        }
        else {
            this.setState({
                errorMessage: "unmatch password"
            })
        }
    }
    // test
    changeHandler = (e) => {

        let temp = { ...this.state.newUser }
        temp[e.target.name] = e.target.value;
        temp["image"] = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
        temp["userRole"] = "ROLE_USER"


        this.setState({

            newUser: temp,

        })
        console.log(temp);
    }
    checkPassword = (password, confirm) => {
        if (password == confirm) {
            return true
        } else {
            return false
        }

    }
    render() {
        const successMessage = this.state.successMessage ? (
            <Alert className="alert" variant="success"> {this.state.successMessage}</Alert>
        ) : null
        const errorMessage = this.state.errorMessage ? (
            <Alert className="alert" variant="danger">{this.state.errorMessage}</Alert>
        ) : null

        return (

            <div>
                {errorMessage}
                {successMessage}
                <Alert variant="success">{this.state.messege}</Alert>

                <Container>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirm" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>

            </div>
        )
    }
}