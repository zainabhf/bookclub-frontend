import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newUser: {}
        }
    }

    registerHandler = () => {
        this.props.register(this.state.newUser);
    }
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState({

            newUser: temp

        })
        console.log(temp);
    }
    render() {
        return (
            <div>
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

                    <Form.Control type="text" name="image" value="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" type="hidden"></Form.Control>

                    <Form.Control name="userRole" value="ROLE_USER" type="hidden" ></Form.Control>
                    <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>

            </div>
        )
    }
}