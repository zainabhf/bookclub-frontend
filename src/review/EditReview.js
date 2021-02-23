import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
<<<<<<< HEAD

export default class EditReview extends Component {
constructor(props) {
    super(props)

    this.state = {
         
    }
}


    render() {
        return (
            <div>
                
=======
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
>>>>>>> 84ecb3cc6c687c880671c58c2903e5b43dc694a0
            </div>
        )
    }
}
<<<<<<< HEAD

=======
>>>>>>> 84ecb3cc6c687c880671c58c2903e5b43dc694a0
