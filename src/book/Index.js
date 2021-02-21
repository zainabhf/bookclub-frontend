import axios from 'axios'
import React, { Component } from 'react'
import Detail from './Detail';
import AddBook from './AddBook';
export default class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: [],
            book: null
        }
    }


    componentDidMount() {
        axios.get("/bookclub/book/index")
            .then(response => {
                console.log(response)
                this.setState({
                    books: response.data
                })
            })
            .catch(error => {
                console.log(" Error book ");
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

    render() {
        return (
            <div>
                <div>
                    <AddBook addBook={this.addBook}></AddBook>
                </div>

                {(this.state.books != null && this.state.book == null) ?

                    <div>
                        {this.state.books.map((book, index) =>
                            <div onClick={() => this.handelDetail(book, book.id)}>

                                <img src={book.image} />
                                <h1>{book.bookName}</h1>

                            </div>
                        )}
                    </div> :
                    <div>
                        <p onClick={() => this.backToIndex()} >Back to home</p>
                        <Detail book={this.state.book}></Detail></div>
                }
            </div>


        )
    }
}

