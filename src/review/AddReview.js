import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'


export default class AddReview extends Component {
    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="reviewContent" placeholder="Add Review" />
                        <Button variant="primary">Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}
