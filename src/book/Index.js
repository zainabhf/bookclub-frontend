import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Detail from './Detail';
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

    render() {
        return (
            <div>




                {/* // <Router>
               
                    //     {this.state.books.map((book, index) =>
                    //     <div onClick={()=>this.handelDetail(book,book.id)}>
                    //         <Link to={`/detail?id=`+book.id}>
                    //         <img src={book.image} />
                    //         <h1>{book.bookName}</h1>
                    //         </Link>
                    //     </div>
                    //     )}
                    //     <Route exact path={`/detail?id=`+this.state.book.id} component={Detail}><Detail book={this.state.book}></Detail></Route>

                       

                    // </Router> */}


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

{/* <Detail book={book} key={book.id}></Detail> */ }