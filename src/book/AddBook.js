import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newBook: {}
        }
    }
    handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedBook = { ...this.state.newBook }
        if (updatedBook[attributeToChange] != "") {
            updatedBook[attributeToChange] = newValue
        } else {
            updatedBook[attributeToChange] = "empty"
        }
        console.log(updatedBook)
        this.setState({
            newBook: updatedBook
        })

    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.addBook(this.state.newBook);
    }



    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Book Name </Form.Label>
                        <Form.Control type="text" name="bookName" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="image" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>number Of pages </Form.Label>
                        <Form.Control type="number" name="numberOfpages" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" name="authorName" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Publish Date</Form.Label>
                        <Form.Control type="date" name="publish" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>

                </Container>
            </div >
        )
    }
}