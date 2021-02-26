import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class AddReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theBook: props.book,
            review: "",
            newObj: {},
            emptyValue: ""
        }

    }

    componentDidMount() {
        const updatedReview = this.state.newObj

        updatedReview["book"] = this.state.theBook
    }

    handelSubmitReview = () => {

        console.log("in method handel submit of review")

        this.props.addReview(this.state.newObj)
    }

    handleChangeReview = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const review = { ...this.state.newObj }

        review[attributeToChange] = newValue


        this.setState({
            newObj: review,
        })

        console.log(review) // value stored from form
        console.log(this.state.newObj) // value to be stored from review..
    }


    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Add Review</Form.Label>
                        <Form.Control type="text" name="reviewContent" placeholder="add review to the book" onChange={this.handleChangeReview} />
                        <Button variant="primary" onClick={this.handelSubmitReview}>Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}