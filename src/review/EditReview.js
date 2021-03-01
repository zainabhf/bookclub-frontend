import axios from 'axios'
import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class EditReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review_content: props.reviewToBeEdited,

        }

        this.handelOnChange = this.handelOnChange.bind(this)
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit() {
        this.props.editBookReview(this.state.review_content)
    }

    handelOnChange(event) {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const review = { ...this.state.review_content }

        review[attributeToChange] = newValue
        review["book"] = this.props.book

        console.log(review)
        this.setState({
            review_content: review
        })

        console.log(review)
    }

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Edit Your Review</Form.Label>
                        <br />
                        <textarea type="text" cols="90" rows="10" name="reviewContent" value={this.state.review_content.reviewContent} onChange={this.handelOnChange} ></textarea>
                        <br />
                        <Button variant="primary" onClick={this.handelSubmit}>Submit</Button>
                    </Form.Group>
                </Container>
                {console.log(this.state.review_content)}

            </div>
        )
    }
}

