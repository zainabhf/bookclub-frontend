import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class AddReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newBook: props.book,
            review: "",
            newObj: {}
        }

        console.log(props.book)
    }

    componentDidMount() {
        const updatedReview = this.state.newObj

        updatedReview["book"] = this.state.newBook
    }

    handelSubmitReview = (event) => {
        console.log("we are sending review :)")
        // console.log(this.state.newObj)
        // {this.state.newObj}
        // this.setState({
        //     newObj: {
        //         review: this.state.review,
        //         book: this.state.newBook
        //     }
        // })
        // console.log(this.state.newObj)

        this.props.addReview(this.state.newObj)
    }

    handleChangeReview = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const review = { ...this.state.newObj }

        review[attributeToChange] = newValue


        console.log(review)
        this.setState({
            newObj: review
        })

        console.log(this.state.newObj)
    }
    

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="reviewContent" placeholder="Type" onChange={this.handleChangeReview} />
                        <Button variant="primary" onClick={this.handelSubmitReview}>Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}