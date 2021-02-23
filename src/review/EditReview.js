import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class EditReview extends Component {
    render() {
        return (
            <div>
                  <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="reviewContent"/>
                        <Button variant="primary">Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}
