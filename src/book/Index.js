import axios from 'axios'
import React, { Component } from 'react'
import Detail from './Detail';
import AddBook from './AddBook';
import EditBook from './EditBook';
import { Card, Alert, Fade } from 'react-bootstrap';
import './Alert.css'
import Home from '../Home'
import './BookStyle.css'


export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: props.books,
            book: props.book,
            isEdit: props.isEdit,
            errorMessage: null,
            redirect: props.redirect,
            successMessage: null

        }
    }

    componentDidMount() {
        this.loadBook()
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
            .put("/bookclub/book/edit", book,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            .then(response => {
                console.log("Edited!!")
                console.log(response)
                this.setState({
                    isEdit: !this.state.isEdit,
                    book: book,
                    successMessage: "Book Edited successfuly ",

                })
                this.loadBook()
                this.loadBookAfterEditing()
            })
            .catch(error => {
                console.log("Error Editing book");
                console.log(error)
                this.setState({

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
            .delete(`/bookclub/book/delete?id=${id}`,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            .then(response => {
                console.log("Deleted!")
                console.log(response)
                this.loadBook()
                this.setState({
                    book: null,
                    successMessage: "The Book Deleted ",
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage: "Try again later" + error,


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
            <div className="connitner">
                {successMessage}
                {errorMessage}
                {(this.state.books != null) ?
                    <div>
                        {(this.state.book == null) ?


                            <div class="row">
                                {this.state.books.map((book, index) =>
                                    <div key={index} onClick={() => this.handelDetail(book, book.id)}>

                                        <Card className="card" key={book.id}>
                                            <Card.Img style={{ width: '100%', height: "80%" }} variant="top" src={book.image} alt="Book image" />

                                            <div className="body-card"><h4>{book.bookName}</h4></div>
                                        </Card>
                                    </div>


                                )}

                            </div>


                            :
                            <div>
                                {(this.state.isEdit === true) ?
                                    <EditBook book={this.state.book} editBook={this.editBook} key={this.state.book.id} />
                                    :
                                    <Detail book={this.state.book} editView={this.editView} key={this.state.book.id} deleteBook={this.deleteBook} isEdit={this.state.isEdit} user={this.props.user} userToken={this.props.userToken} />
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