import React, { Component } from 'react'
import EditReview from '../review/EditReview'
import AddReview from '../review/AddReview'
import './reviewStyle.css'
export default class Review extends Component {

    render() {
        { console.log(this.props.review_book) }
        console.log(this.props.user)
        return (
            <div>
                {(this.props.review_book.length != 0) ?
                    <div>
                        {(this.props.isEditReview != true) ?
                            <div>
                                {this.props.review_book.map((review) =>
                                    <div>
                                        <div class="test">
                                        <div class="user-row">
                                        <img class="review-img" src={review.user.image}  />
                                        <p class="name">{review.user.name}</p>
                                        </div>
                                        <p>{review.reviewContent}</p>

                                        {(this.props.user != null) ?
                                            <div>
                                                {((this.props.user.userRole == "ROLE_ADMIN") || (review.user != null && review.user.id == this.props.user.id)) ?
                                                    <div>
                                                        <button onClick={() => this.props.editViewReview(review)}>Edit</button>
                                                        <button onClick={() => this.props.deleteReview(review)}>Delete</button>
                                                        {console.log(review)}
                                                        {console.log(review.user.name)}
                                                        {console.log(review.user.id)}
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                            </div>

                                            :
                                            <div></div>
                                        }


                                    </div>
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
                        <p>Be the first one who add's a review about {this.props.book.bookName}!</p>
                    </div>
                }

                <hr />
                {(this.props.user != null) ?
                    <AddReview addReview={this.props.addReview} book={this.props.book} user={this.props.user} />
                    :
                    <div></div>
                }

            </div >

        )
    }
}
