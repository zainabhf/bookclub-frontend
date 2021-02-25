import axios from 'axios'
import React, { Component } from 'react'
import Detail from './Detail';
import AddBook from './AddBook';
import EditBook from './EditBook';
import { Card,Alert, Fade  } from 'react-bootstrap';
import './Alert.css'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            book: null,
            isEdit: false,
            isAdd: false,
            errorMessage: null,
            successMessage: null,
            visible : false
          
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
                    book: null,
                    isAdd: false,

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
            book: null,
            isAdd: false,
            isEdit: false
        })
    }

    viewAddBook = () => {
        this.setState({
            isAdd: true,
            book: null,
            isEdit: false
        })
    }

    addBook = (book) => {
        axios
            .post("/bookclub/book/add", book)
            .then(response => {
                console.log("book add sucssfully")
                const updatedBookList = [...this.state.books];
                updatedBookList.push(response.data);
                this.setState({
                    books: updatedBookList,
                    isAdd: false,
                    
            successMessage: "The book added successfuly",
            errorMessage:null
                })
            })
            .catch(error => {
                console.log("erroe in adding book");
                console.log(error)
                this.setState({
                    errorMessage: "Ooops there somthing wrong try again later "+error,
                   
          
                })
            })
    }
    editBook = (book) => {
        axios
            .put("/bookclub/book/edit", book)
            .then(response => {
                console.log("Edited!!")
                console.log(response)
                this.setState({
                     isEdit: !this.state.isEdit ,
            successMessage: "Book Edited successfuly ",
           
                })
                this.loadBook()
            })
            .catch(error => {
                console.log("Error Editing book");
                console.log(error)
                this.setState({
                    errorMessage: "Ooops there something wrong "+error,
                  
           
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
            errorMessage:null
         
           
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage: "Try again later"+error,
                    successMessage:""
            
                })
            })
    }
    onShowAlert = ()=>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            this.setState({visible:false})
          },2000)
        });
      }
 
    render() {
      
        const  successMessage=this.state.successMessage ?(
           
        
            <Alert className="alert" variant="success"> {this.state.successMessage}</Alert>
           
        ):null
        const  errorMessage=this.state.errorMessage ?(
            <Alert className="alert"  variant="danger">{this.state.errorMessage}</Alert>

        ):null
        return (
           

            <div>
                 {successMessage}
            {errorMessage}
                <p onClick={this.viewAddBook}>Add Book</p>
                <p onClick={() => this.backToIndex()} >Back to home</p>
                {(this.state.isAdd === true) ?
                    <div>
                        <AddBook addBook={this.addBook} />
                    </div>
                    :
                    <div>
                        {(this.state.books != null && this.state.book == null) ?

                            <div className="row">
                                {this.state.books.map((book, index) =>
                                    <div onClick={() => this.handelDetail(book, book.id)}>
                                        <Card style={{ width: '18rem' }} index={index} key={book.id}>
                                            <Card.Img variant="top" src={book.image} alt="Book image" />
                                            <Card.Body>
                                                <Card.Title>{book.bookName}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )}
                            </div> :
                            <div>
                                {(this.state.isEdit === true) ?
                                    <EditBook book={this.state.book} editBook={this.editBook} />
                                    :
                                    <Detail book={this.state.book} editView={this.editView} key={this.state.book.id} deleteBook={this.deleteBook} isEdit={this.state.isEdit} />
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}