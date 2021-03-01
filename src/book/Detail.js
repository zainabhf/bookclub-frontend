import axios from 'axios'
import React, { Component } from 'react'
// import AddReview from '../review/AddReview'
// import EditReview from '../review/EditReview'
import { Card, Alert, Fade, Container, Row, Col } from 'react-bootstrap';
import './Alert.css'
import Review from '../review/Review';
import './BookStyle.css'


export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review_book: props.book.review_book, // to get review from class book (review_book)
            review_content: {}, // to store the review when add, delete and edit the review
            isEditReview: false, // to show the form of editing the review
            reviewToBeEdited: null, // to save object of review while editing
            errorMessage: null,
            successMessage: null
        }
    }
    /*
     * set the state to show the form of editing the review
     * and store the value of review to be edited
     */
    editViewReview = (review) => {
        this.setState({
            isEditReview: true,
            reviewToBeEdited: review
        })
    }
    /**
     * after editing the review and submiting, hide the form and 
     * set the object of review to null (cleaning the object)
     */
    submitEditReview = () => {
        console.log("inside submit edit of review")
        this.setState({
            isEditReview: false,
            reviewToBeEdited: null
        })
    }

    addBookReview = (review) => {
        console.log("Book to be show")
        axios.post("/bookclub/review/add", review,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                this.setState({
                    review_content: this.state.review_book,
                    successMessage: "The review added Successfully"
                })
                this.loadReview()
            })
            .catch(error => {
                console.log(" Error adding review ");
                console.log(error);
                this.setState({
                    errorMessage: "OOps sorry try again later",

                })
            })
    }

    editBookReview = (review) => {
        console.log("review is edited !")
        axios.put(`/bookclub/review/edit?id=${review.id}`, review,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("Add Review - response: ") // get from class review
                console.log(response.data)
                console.log("Add Review: - review of book ") // get from class book
                console.log(review)
                this.setState({
                    review_content: this.state.review_book,
                    successMessage: "the review updeted Successfully"
                })
                this.submitEditReview()
                this.loadReview()
            })
            .catch(error => {
                console.log(" Error adding review ");
                console.log(error);
                this.setState({
                    errorMessage: "OOps somthing wrong please try again later"
                })
            })
    }

    deleteReview = (review) => {
        axios
            .delete(`/bookclub/review/delete?id=${review.id}`,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            .then(response => {
                console.log("Deleted!")
                console.log(response)
                this.loadReview()
                this.setState({
                    successMessage: "The review deleted Successfully"
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage: "oops please try again later"
                })
            })
        console.log(this.state.review_book)
        console.log(this.state.review_content)
    }

    loadReview = () => {
        axios
            .get(`/bookclub/book/detail?id=${this.props.book.id}`)
            .then(response => {
                console.log("load reviews of " + this.props.book.bookName + " book")
                response.data.review_book.map((index) =>
                    console.log(index.reviewContent))

                this.setState({
                    review_book: response.data.review_book
                })
            })
            .catch(error => {
                console.log("Error retreiving books !!");
                console.log(error);
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
                { (this.props.book != null) ?
                    <div>

                        <div className="row-detile">


                            <img className="image-detile" src={this.props.book.image} alt="Book Cover" />
                            <p className="book-title"> {this.props.book.bookName}</p><br /><br />


                        </div>

                        <p className="book-descreption">Description:  {this.props.book.description}</p>


                        <h4 className="book-author">Written By: {this.props.book.authorName}</h4>
                        <hr/>
                        <div className="book-date">
                            <p >Pages: {this.props.book.numberOfpages}</p>
                            <p >Publishing Date: {this.props.book.publish}</p>
                        </div>
                        {(this.props.user != null && this.props.user.userRole == "ROLE_ADMIN") ?
                            <div>
                                <button onClick={() => { this.props.editView() }}>Edit</button>
                                <button onClick={() => { this.props.deleteBook(this.props.book.id) }}>Delete</button>

                            </div>
                            :
                            <div>
                                {(this.props.user != null && this.props.user.userRole == "ROLE_USER") ?
                                    <div>
                                        <button onClick={() => { this.props.editView() }}>Edit</button>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                        }

                        <hr />

                        <Review
                            book={this.props.book}
                            user={this.props.user}
                            review_book={this.state.review_book}
                            reviewToBeEdited={this.state.reviewToBeEdited}
                            editBookReview={this.editBookReview}
                            editViewReview={this.editViewReview}
                            deleteReview={this.deleteReview}
                            addReview={this.addBookReview}
                            submitEditReview={this.submitEditReview}
                            isEditReview={this.state.isEditReview}
                        />

                    </div>
                    //in case book is null and detail won't be show (no book is selected !)
                    :
                    <h1>Nothing to show</h1>
                }
            </div>
        )
    }
}