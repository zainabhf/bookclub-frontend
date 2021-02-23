import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'




export default class AddReview extends Component {
  
    handelSubmit=(event)=>{
        this.props.addReview(event.target.value)
    }
    

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="reviewContent" placeholder="Add Review" />
                        <Button variant="primary" handelSubmit={this.handelSubmit}>Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}
// test