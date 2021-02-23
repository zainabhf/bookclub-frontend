import axios from 'axios'
import React, { Component } from 'react'
import AddReview from '../review/AddReview'


export default class Detail extends Component {



    addReview = (review) => {
        axios.post("/bookclub/review/add")
            .then(response => {
                console.log("Add Review: " + response)

                this.setState({
                    reviews: this.state.reviews.concat(review)
                })
            })

            .catch(error => {
                console.log(" Error book ");
                console.log(error);
            })
    }

    render() {
        console.log(this.props.book)
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
                        {this.props.book.review_book.map((review, index) =>
                            <p key={index}>{review.reviewContent}</p>
                        )}
                        <hr />
                        <AddReview addReview={this.addReview} />
                    </div>
                    :
                    <h1>Nothig to show</h1>}
            </div>
        )
    }
}
