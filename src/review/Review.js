import React, { Component } from 'react'
import EditReview from '../review/EditReview'
import AddReview from '../review/AddReview'
import { Button } from 'react-bootstrap'

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
                                                <img class="review-img" src={review.user.image} />
                                                <p class="name">{review.user.name}</p>
                                            </div>

                                            <p class="review">{review.reviewContent}</p>

                                            {(this.props.user != null) ?
                                                <div className="button-container" >
                                                    {((this.props.user.userRole == "ROLE_ADMIN") || (review.user != null && review.user.id == this.props.user.id)) ?
                                                        <div className="button-container" >
                                                            <Button variant="secondary" onClick={() => this.props.editViewReview(review)}><i class="fa fa-wrench"></i> Edit</Button>
                                                            <Button variant="danger" onClick={() => this.props.deleteReview(review)}><i class="fa fa-trash"></i> Delete</Button>

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
                                )}
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
                        {(this.props.userToken != "") ?
                            <p>Be the first one who add's a review about {this.props.book.bookName}!</p>
                            :
                            <div></div>
                        }
                    </div>
                }

                <hr />
                {(this.props.user != null) ?
                    <AddReview
                        addReview={this.props.addReview}
                        book={this.props.book}
                        user={this.props.user}
                        userToken={this.props.userToken}
                    />
                    :
                    <div></div>
                }

            </div >

        )
    }
}
