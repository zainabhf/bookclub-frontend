import React, { Component } from 'react'
import axios from 'axios'
import { Button, Container, Form } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';
import '../book/Alert.css'
import '../HomeStyle.css'
import '../book/Detail?id='

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            tempUserForEditingPassword: props.user, // used as temp to hold the user information so that all the info are save from damage !
            isEdit: false,
            isClick: false,
            errorMessage: null,
            successMessage: null,
            reviewsOfUser: [],
            books: this.props.books,
            // clickOnBook: this.props.book,
            redirect: this.props.redirect
        };
    }

    editViewProfile = () => {
        this.setState({
            isEdit: true,
            isClick: true
        })
    }

    changeHandlerEditProfile = (e) => {

        let temp = { ...this.state.user }
        temp[e.target.name] = e.target.value;

        temp["emailAddress"] = this.state.user.emailAddress
        temp["userRole"] = this.state.user.userRole
        temp["password"] = this.state.user.password
        temp["id"] = this.state.user.id

        this.setState({
            user: temp
        })
    }

    submitHandlerEditProfile = () => {
        this.setState({
            isEdit: false,
            isClick: false,
            successMessage: 'Profile updated successfully !'
        })
        this.props.updateProfile(this.state.user)
    }

    editViewChangePassword = () => {
        this.setState({
            isClick: true
        })
    }

    changeHandlerPassword = (e) => {
        let temp = { ...this.state.tempUserForEditingPassword }

        temp["emailAddress"] = this.state.user.emailAddress
        temp["userRole"] = this.state.user.userRole
        temp["image"] = this.state.user.image
        temp["name"] = this.state.user.name
        temp["id"] = this.state.user.id

        const name = e.target.name

        temp[name] = e.target.value;

        this.setState({
            tempUserForEditingPassword: temp
        })
    }

    isMatchPassword = (password1, password2) => {
        if (password1 == password2) {
            return true;
        } else {
            return false;
        }
    }

    submitHandlerPassword = () => {



        if (this.isMatchPassword(this.state.tempUserForEditingPassword.updatedPassword, this.state.tempUserForEditingPassword.confirmUpdatedPassword)) {
            this.props.updatePassword(this.state.tempUserForEditingPassword)

            console.log("It's right .. both pass is matched")
            console.log("UPDATED PASS")

            this.setState({
                isClick: false
            })
        }
    }

    render() {
        const successMessage = this.state.successMessage ? (
            <Alert className="alert" variant="success"> {this.state.successMessage}</Alert>
        ) : null
        const errorMessage = this.state.errorMessage ? (
            <Alert className="alert" variant="danger">{this.state.errorMessage}</Alert>
        ) : null

        return (
            <div >
                {errorMessage}
                {successMessage}

                {(this.props.userToken != "") ?

                    <div>

                        {console.log(this.state.user)}

                        {(this.state.isClick != true) ?
                            <div>
                                <img src="/background-profile.png" alt="back-ground profile" class="background-profile" />

                                <div className="user-info-container">
                                    <img src={this.state.user.image} alt="Profile Picture" className="profile-picture" />
                                    <div id="button">
                                        <button type="button" className="btn btn-secondary" onClick={this.editViewProfile}>Edit Profile</button>
                                        <button type="button" className="btn btn-warning" onClick={this.editViewChangePassword}>Change Password</button>
                                    </div>
                                    <div className="user-info">
                                        <p><b>Name:</b> {this.state.user.name}</p>
                                        <p><b>Email Address:</b> {this.state.user.emailAddress}</p>
                                        <p><b>Reviews:</b></p>
                                        <div className="overflow">
                                            {this.state.books.map((book) =>
                                                <div>
                                                    {book.review_book.map((review) =>
                                                        <div >
                                                            {(book.review_book.length == 0) ?
                                                                <div></div>
                                                                :
                                                                <div>
                                                                    {(review.user.id == this.state.user.id) ?
                                                                        <div className="review-container">
                                                                            <div className="review-book">{book.bookName}</div>
                                                                            <div className="review-content">{review.reviewContent}</div>
                                                                        </div>
                                                                        :
                                                                        <div></div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {(this.state.isEdit == true) ?

                                    <div>
                                        < Container >
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name" value={this.state.user.name} onChange={this.changeHandlerEditProfile}></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Profile Image URL</Form.Label>
                                                <Form.Control type="text" name="image" value={this.state.user.image} onChange={this.changeHandlerEditProfile}></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control type="email" name="emailAddress" value={this.state.user.emailAddress} onChange={this.changeHandlerEditProfile} disabled></Form.Control>
                                            </Form.Group>
                                            <Button variant="primary" block onClick={this.submitHandlerEditProfile}>Submit</Button>
                                        </Container >
                                    </div>
                                    :
                                    <div>
                                        < Container >
                                            <Form.Group>
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control type="password" name="password" onChange={this.changeHandlerPassword}></Form.Control>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" name="updatedPassword" onChange={this.changeHandlerPassword}></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" name="confirmUpdatedPassword" onChange={this.changeHandlerPassword}></Form.Control>
                                            </Form.Group>


                                            <Button variant="primary" block onClick={this.submitHandlerPassword}>Submit</Button>
                                        </Container >
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    :
                    <div>No User is logged in !</div>
                }
            </div >

        )
    }
}