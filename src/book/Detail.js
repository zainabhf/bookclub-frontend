import axios from 'axios'
import React, { Component } from 'react'
import AddReview from '../review/AddReview'
import EditReview from '../review/EditReview'

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
        axios.post("/bookclub/review/add", review)
            .then(response => {
                this.setState({
                    review_content: this.state.review_book,
                    successMessage:"The review added Successfully"
                })
                this.loadReview()
            })
            .catch(error => {
                console.log(" Error adding review ");
                console.log(error);
                this.setState({
                    errorMessage:"OOps sorry try again later",
                  
                })
            })
    }

    editBookReview = (review) => {
        console.log("review is edited !")
        axios.put(`/bookclub/review/edit?id=${review.id}`, review)
            .then(response => {
                console.log("Add Review - response: ") // get from class review
                console.log(response.data)
                console.log("Add Review: - review of book ") // get from class book
                console.log(review)
                this.setState({
                    review_content: this.state.review_book,
                    successMessage:"the review updeted Successfully"
                })
                this.submitEditReview()
                this.loadReview()
            })
            .catch(error => {
                console.log(" Error adding review ");
                console.log(error);
                this.setState({
                    errorMessage:"OOps somthing wrong please try again later"
                })
            })
    }

    deleteReview = (review) => {
        axios
            .delete(`/bookclub/review/delete?id=${review.id}`)
            .then(response => {
                console.log("Deleted!")
                console.log(response)
                this.loadReview()
                this.setState({
                    successMessage:"The review deleted Successfully"
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage:"oops please try again later"
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
                { (this.props.book != null) ?
                    <div>
                        <img src={this.props.book.image} alt="Book Cover" />
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
                                {(this.state.isEditReview != true) ?
                                    <div>
                                        {this.state.review_book.map((review, index) =>
                                            <div>
                                                <p>{review.reviewContent}</p>
                                                <button
                                                    onClick={() => this.editViewReview(review)}
                                                >Edit</button>
                                                <button onClick={() => this.deleteReview(review)} >Delete</button>
                                            </div>
                                        )}

                                    </div>
                                    :
                                    <div>
                                        <EditReview
                                            review_book={this.state.review_book}
                                            book={this.props.book}
                                            // id={this.state.idOfReview}
                                            submitEditReview={this.submitEditReview}
                                            reviewToBeEdited={this.state.reviewToBeEdited} editBookReview={this.editBookReview} />
                                    </div>
                                } </div>
                            :
                            <div></div>
                        }
                        <hr />
                        <AddReview addReview={this.addBookReview} book={this.props.book} />

                    </div>
                    :
                    <h1>Nothing to show</h1>
                }
            </div>
        )
    }
}