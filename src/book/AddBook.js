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
        updatedBook[attributeToChange] = newValue

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
                        <Form.Control type="text" name="bookName" placeholder="Book Name" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="image" placeholder="URL of Image" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number Of Pages </Form.Label>
                        <Form.Control type="number" name="numberOfpages" placeholder="Number of Pages" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" name="authorName" placeholder="Author Name" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" placeholder="Category" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" placeholder="Description" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Publish Date</Form.Label>
                        <Form.Control type="date" name="publish" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>

                </Container>
              {console.log(this.state.newBook)}
            </div >
        )
    }
}