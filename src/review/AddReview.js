import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class AddReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theBook: props.book,
            review: "",
            newObj: {},
            reviewValue: "",
            user: props.user
        }

    }

    componentDidMount() {
        const updatedReview = this.state.newObj

        updatedReview["book"] = this.state.theBook
        updatedReview["user"] = this.state.user
    }

    handelSubmitReview = () => {

        console.log("in method handel submit of review")

        this.setState({
            reviewValue: ""
        })
        this.props.addReview(this.state.newObj)

    }

    handleChangeReview = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const review = { ...this.state.newObj }

        review[attributeToChange] = newValue


        this.setState({
            reviewValue: event.target.reviewValue,
            newObj: review,
        })

        console.log(review) // value stored from form
        console.log(this.state.newObj) // value to be stored from review..
    }


    render() {
        return (
            <div className="AddReviewContainer">
                {(this.props.userToken != "") ?
                    <Container >
                        <Form.Group >
                            <Form.Label>Add Review</Form.Label>
                            <br />
                            <textarea type="text" rows="10" cols="90" name="reviewContent" value={this.state.reviewValue} placeholder="add review to the book" onChange={this.handleChangeReview}></textarea>
                            <br />

                            <Button variant="primary" onClick={this.handelSubmitReview}>Submit</Button>
                        </Form.Group>
                    </Container>
                    :
                    <div></div>
                }
            </div>
        )
    }
}