import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class EditReview extends Component {
  constructor(props) {
      super(props)
  
      this.state = {
        review_content : props.review_content
      }
  }
   
    
    render() {
        console.log(this.props.review_content)
        return (
            <div>
                  <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="reviewContent" value = {this.props.book.review_content}/>
                        <Button variant="primary">Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}