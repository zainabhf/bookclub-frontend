import axios from 'axios'
import React, { Component } from 'react'
import Detail from './Detail';
import AddBook from './AddBook';
import EditBook from './EditBook';
import { Card, Alert, Fade } from 'react-bootstrap';
import './Alert.css'
import Home from '../Home'


export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: props.books,
            book: props.book,
            isEdit: props.isEdit,
            errorMessage: null,
            redirect: props.redirect,

        }
    }
    componentDidMount() {
        this.loadBook()
        this.setState({
            book: null
        })
    }
    loadBook = () => {
        axios
            .get("/bookclub/book/index")
            .then(response => {
                console.log("loadBook")
                console.log(response)
                this.setState({
                    books: response.data,
                    book: this.state.book,

                })

            })
            .catch(error => {
                console.log("Error retreiving books !!");
                console.log(error);
            })
    }
    handelDetail(book, id) {
        console.log(book)
        axios
            .get(`/bookclub/book/detail?id=${id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    book: book,
                })
            })
            .catch(error => {
                console.log(" Error book ");
                console.log(error);
            })
    }

    editBook = (book) => {
        axios
            .put("/bookclub/book/edit", book)
            .then(response => {
                console.log("Edited!!")
                console.log(response)
                this.setState({
                    isEdit: !this.state.isEdit,
                    successMessage: "Book Edited successfuly ",

                })
                this.loadBook()
            })
            .catch(error => {
                console.log("Error Editing book");
                console.log(error)
                this.setState({
                    errorMessage: "Ooops there something wrong " + error,
                })
            })
    }

    editView = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    deleteBook = (id) => {
        axios
            .delete(`/bookclub/book/delete?id=${id}`)
            .then(response => {
                console.log("Deleted!")
                console.log(response)
                this.loadBook()
                this.setState({
                    book: null,

                    successMessage: "The Book Deleted ",
                    errorMessage: null


                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage: "Try again later" + error,
                    successMessage: ""

                })
            })
    }


    render() {
        const successMessage = this.state.successMessage ? (
            <Alert className="alert" variant="success"> {this.state.successMessage}</Alert>
        ) : null
        const errorMessage = this.state.errorMessage ? (
            <Alert className="alert" variant="danger">{this.state.errorMessage}</Alert>
        ) : null
        return (
            <div>
               
                {successMessage}
                {errorMessage}
                {(this.state.books != null) ?
                    <div>
                        {(this.state.book == null) ?

                            <div class="row">
                                {this.state.books.map((book) =>
                                    <div onClick={() => this.handelDetail(book, book.id)}>
                                        <Card style={{ width: '18rem' }} key={book.id}>
                                            <Card.Img variant="top" src={book.image} alt="Book image" />
                                            <Card.Body>
                                                <Card.Title>{book.bookName}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )}
                            </div>
                            :
                            <div>
                                {(this.state.isEdit === true) ?
                                    <EditBook book={this.state.book} editBook={this.editBook} key={this.state.book.id} />
                                    :
                                    <Detail book={this.state.book} editView={this.editView} key={this.state.book.id} deleteBook={this.deleteBook} isEdit={this.state.isEdit} />
                                }
                            </div>
                        }
                    </div>
                    :
                    <div>There're no books to show, add one !</div>
                }
            </div>
        )
    }
}