import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class AddReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newReview: props.book.review_book,
            book:props.book
        }
    }
    handelSubmit=(event)=>{
        // event.preventDefault()
        console.log("we are sending review:)")
        this.props.addReview(this.state.book)



    }
    handleChange=(event)=>{
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const book = {...this.state.book}
        
        book[attributeToChange]= newValue
       
        console.log(book)
        this.setState({
            book:book
        })
    }

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Review</Form.Label>
                        <Form.Control type="text" name="review_book" placeholder="Add Review" onChange={this.handleChange}/>
                        <Button variant="primary" handelSubmit={this.handelSubmit()}>Submit</Button>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}
// test