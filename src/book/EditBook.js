import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBook: props.book
        }
    }
    handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedBook = { ...this.state.newBook }
        updatedBook[attributeToChange] = newValue
        console.log(updatedBook)
        this.setState({
            newBook: updatedBook
        })

    }

    handleSubmit = (event) => {
        console.log(this.state.newBook)
        event.preventDefault()

        this.props.editBook(this.state.newBook);
    }

    render() {
        return (
            <div>
                <Container >
                    <Form.Group >
                        <Form.Label>Book Name </Form.Label>
                        <Form.Control type="text" name="bookName" value={this.state.newBook.bookName} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.newBook.image} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>number Of pages </Form.Label>
                        <Form.Control type="number" name="numberOfpages" value={this.state.newBook.numberOfpages} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" name="authorName" value={this.state.newBook.authorName} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.newBook.category} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.newBook.description} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Publish Date</Form.Label>
                        <Form.Control type="date" name="publish" value={this.state.newBook.publish} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>

                </Container>
            </div>
        )
    }
}
