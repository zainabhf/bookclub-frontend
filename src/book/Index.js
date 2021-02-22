import axios from 'axios'
import React, { Component } from 'react'
import Detail from './Detail';
import AddBook from './AddBook';
import EditBook from './EditBook';
import { Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            book: null,
            isEdit: false,
            clickedBookId: '',
            redirect: null
        }
    }
    componentDidMount() {
        this.loadBook()
    }
    loadBook = () => {
        axios.get("/bookclub/book/index")
        .then(response =>{
            console.log("loadBook")
            console.log(response)
            this.setState({
                books: response.data
            })
        })
        .catch(error =>{
            console.log("Error retreiving books !!");
            console.log(error);
        })
    }
    handelDetail(book, id) {
        console.log(book)
        axios.get(`/bookclub/book/detail?id=${id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    book: book
                })
            })
            .catch(error => {
                console.log(" Error book ");
                console.log(error);
            })
    }
    backToIndex() {
        this.setState({
            book: null
        })
    }
    addBook = (book) => {
        axios.post("/bookclub/book/add", book)
            .then(response => {
                console.log("book add sucssfully")
                const updatedBookList = [...this.state.books];
                // updatedBookList.push(response.data);
                updatedBookList.push(response.data);
                this.setState({
                    books: updatedBookList
                })
            })
            .catch(error => {
                console.log("erroe in adding book");
                console.log(error)
            })
    }
    editBook = (book) => {
        axios.put("/bookclub/book/edit", book)
            .then(response => {
                console.log("Edited!!")
                console.log(response)
                this.setState({ isEdit: !this.state.isEdit })
            })
            .catch(error => {
                console.log("Error Editing book");
                console.log(error)
            })
    }
    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedBookId: id
        })
    }

    deleteBook= (id) =>{
        axios.delete(`/bookclub/book/delete?id=${id}`)
        .then(response =>{
            console.log("Deleted!")
            console.log(response)
            this.loadBook()
            this.setState({book:null,
                redirect: `/book/index`})
        })
    .catch(error =>{
        console.log(error)
    })}
    render() {
        if (this.state.redirect) {
             <Redirect to={this.state.redirect} />
             
          }
          console.log(this.state.books)
        return (
            <div >
                <div>
                    <AddBook addBook={this.addBook}></AddBook>
                </div>
                {(this.state.books != null && this.state.book == null) ?

                    <div className="row">
                        {this.state.books.map((book, index) =>
                            <div onClick={() => this.handelDetail(book, book.id)}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={book.image} />
                                    <Card.Body>
                                        <Card.Title>{book.bookName}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </div> :
                    <div>
                        <p onClick={() => this.backToIndex()} >Back to home</p>
                        {(this.state.isEdit === true) ?
                            <EditBook book={this.state.book} editBook={this.editBook}></EditBook>
                            :
                            <Detail book={this.state.book} editView={this.editView} key={this.state.book.id} deleteBook={this.deleteBook} isEdit={this.state.isEdit} ></Detail>
                        } </div>
                }
            </div>
        )
    }
}