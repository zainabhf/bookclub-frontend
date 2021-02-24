import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class EditReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review_content: props.reviewToBeEdited
        }

        this.handelOnChange = this.handelOnChange.bind(this)
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit() {

    }

    handelOnChange(event) {
        // const attributeToChange = event.target.name
        // const newValue = event.target.value

        // const review = { ...this.state.review_conetnt }

        // review[attributeToChange] = newValue


        // console.log(review)
        // this.setState({
        //     review_conetnt: review
        // })

        // console.log(this.state.newObj)
    }

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Edit Your Review</Form.Label>
                        <Form.Control
                            type="text"
                            name="reviewContent"
                            value={this.state.review_content.reviewContent}
                        />
                        <Button variant="primary" onClick={() => this.props.submitEditReview()}>Submit</Button>
                    </Form.Group>
                </Container>
                {/* {this.state.reviewToBeEdited.id} */}
            </div>
        )
    }
}