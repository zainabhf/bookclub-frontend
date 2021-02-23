import axios from 'axios'
import React, { Component } from 'react'
import AddReview from '../review/AddReview'


export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review_book: props.book.review_book,
            review_content: {},
            // book: props.book
        }
    }


    addBookReview = (review) => {
        console.log("Book to be show")
        axios.post("/bookclub/review/add", review)
            .then(response => {
                console.log("Add Review - response: ") // get from class review
                console.log(response.data)
                console.log("Add Review: - review of book ") // get from class book
                console.log(review)


                this.setState({
                    review_content: this.state.review_book

                })
            })
            .catch(error => {
                console.log(" Error adding review ");
                console.log(error);
            })
    }

    render() {
        return (

            <div>
                { (this.props.book != null) ?
                    <div>
                        <img src={this.props.book.image} alt="Book image" />
                        <p>Title: {this.props.book.bookName}</p>
                        <p>By: {this.props.book.authorName}</p>
                        <p>{this.props.book.description}</p>

                        <p>Pages: {this.props.book.numberOfpages}</p>
                        <p>Publishing Date: {this.props.book.publish}</p>


                        <button onClick={() => { this.props.deleteBook(this.props.book.id) }}>Delete</button>
                        <button onClick={() => { this.props.editView() }}>Edit</button>
                        <hr />
                        {(this.props.book.review_book != null) ?
                            <div>
                                {this.props.book.review_book.map((review, index) =>
                                    <p key={index}>{review.reviewContent}</p>
                                )}
                            </div> : <div></div>

                        }

                        <hr />
                        <AddReview addReview={this.addBookReview} book={this.props.book} />
                    </div>
                    :
                    <h1>Nothing to show</h1>}
            </div>
        )
    }
}
