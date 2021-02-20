import axios from 'axios'
import React, { Component } from 'react'

export default class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           books: [],
        }
    }
    
    componentDidMount(){
        axios.get("/bookclub/book/index")
            .then(response =>{
                console.log(response)
                this.setState({
                    books: response.data
                })
            })
            .catch(error =>{
                console.log(" Error book ");
                console.log(error);
            })


    }
    render() {
        return (
            <div>

                <h1>Test</h1>
                {this.state.books.map((book, index) =>
                    <div  key={index}>
                        {book.bookName}
                        <img src={book.image} alt=""/>
                        </div>)}
            </div>
        )
    }
}
