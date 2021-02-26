import React, { Component } from 'react'
import EditReview from '../review/EditReview'
import AddReview from '../review/AddReview'

export default class Review extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        { console.log(this.props.review_book) }

        return (
            <div>
                {(this.props.review_book.length != 0) ?
                    <div>
                        {(this.props.isEditReview != true) ?
                            <div>
                                {this.props.review_book.map((review) =>
                                    <div>
                                        <p>{review.reviewContent}</p>
                                        <button
                                            onClick={() => this.props.editViewReview(review)}
                                        >Edit</button>
                                        <button onClick={() => this.props.deleteReview(review)}>Delete</button>
                                    </div>
                                )
                                }
                            </div>

                            :
                            <div>
                                <EditReview
                                    review_book={this.props.review_book}
                                    book={this.props.book}
                                    submitEditReview={this.props.submitEditReview}
                                    reviewToBeEdited={this.props.reviewToBeEdited} editBookReview={this.props.editBookReview} />
                            </div>
                        }

                    </div>
                    :
                    <div>
                        <p>Be the first one who add's a review !</p>
                    </div>
                }

                <hr />
                <AddReview addReview={this.props.addReview} book={this.props.book} />

            </div >

        )
    }
}
