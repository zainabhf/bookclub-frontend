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
                    <Form.Group>
                        <Form.Label>Book Name </Form.Label>
                        <Form.Control type="text" name="bookName" value={this.state.newBook.bookName} placeholder="Book Name" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.newBook.image} placeholder="URL Image" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number Of Pages </Form.Label>
                        <Form.Control type="number" name="numberOfpages" value={this.state.newBook.numberOfpages} placeholder="Number of Pages" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" name="authorName" value={this.state.newBook.authorName} placeholder="Author Name" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.newBook.category} placeholder="Category" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.newBook.description} placeholder="Description" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Publish Date</Form.Label>
                        <Form.Control type="date" name="publish" value={this.state.newBook.publish} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Control type="hidden" name="id" value={this.state.newBook.id} onChange={this.handleChange}></Form.Control>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>

                </Container>
            </div >
        )
    }
}
