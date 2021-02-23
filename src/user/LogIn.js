import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class LogIn extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" ></Form.Control>
                    </Form.Group>


                    <Button variant="primary" >Login</Button>
                </Container>
            </div>
        )
    }
}
