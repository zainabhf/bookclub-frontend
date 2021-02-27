import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import Index from './book/Index';
import Home from './Home';
import Login from './user/Login';
import AddBook from './book/AddBook';
import Register from './user/Register';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { decode } from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { Card, Alert, Fade } from 'react-bootstrap';
import './book/Alert.css'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}, // user information will be in this object when he login successfully
      isAuth: false,
      userToken: "", // to store token when user is login
      redirect: "",
      book: null, // when clicking on some book, the details will be in this key..
      isEdit: false,
      books: [],
      successMessage: null,
      errorMessage: null,
    }
  }

  componentDidMount() {

    let token = localStorage.getItem("token");

    if (token != null) {
      let user = decode(token);

      if (user) {
        this.setState({
          isAuth: true,
          user: user,
        });
      } else if (!user) {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }

    console.log(this.state.user)
  }



  login = (user) => {
    axios
      .post("/bookclub/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        console.log("Logged in successfully !")

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let userToken = decode(response.data.token);

          this.setState({
            isAuth: true,
            user: user,
            userToken: userToken,
            redirect: '../'
            // successMessage: "Successfully logged in!!!",
            // message: null
          });
        } else {
          this.setState({
            isAuth: false,
            userToken: null,
            user: {},
            // message: "Incorrect username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          message: "Error Occured while login, please try again !",
        });
      });

    console.log(this.state.user)

  }

  register = (user) => {
    axios.post(`/bookclub/user/registration`, user)
      .then(response => {
        console.log("response in axios of registeration")
        console.log(response)
        console.log("user information in axios of registeration")
        console.log(user)
        this.setState({
          // user: user,
          redirect: "./Login"
        })
      })
      .catch(error => {
        console.log(" error registering user");
        console.log(error);
      })
  }

  addBook = (book) => {
    axios
      .post("/bookclub/book/add", book,
      {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
      .then(response => {
        console.log("book add sucssfully")
        const updatedBookList = [...this.state.books];
        updatedBookList.push(response.data);
        this.setState({
          books: updatedBookList,
          redirect: './Index',
          successMessage: "The book added successfuly",

        })
      })
      .catch(error => {
        console.log("erroe in adding book");
        console.log(error)
        this.setState({
          errorMessage: "Ooops there somthing wrong try again later " + error,


        })
      })
  }

  backToBooks = () => {
    this.setState({
      book: null,
    })

  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
      userToken: "",
      redirect: '../'
    });
  };
  render() {
    const { isAuth } = this.state;
    console.log("Book state in App.js : " + this.state.book)
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
        <nav>

          <Router>
            {/* {Redirect user after registeration to login page..} */}
            <div>
            <Redirect to={this.state.redirect} />
            
            </div>
            {isAuth ? (
              <div>
< Link to="/">Home</Link>{' '}
            <Link to="/book/index" onClick={this.backToBooks}>Books</Link>{' '}
                <Link to="/book/add" >Add Book</Link>{' '}
                <Link to="user/logout" onClick={this.logout}>Logout</Link>{' '}
                {/* <Link to="user/profile">Profile</Link>{' '} */}
                </div>
              ):
              (
                <div>
                  < Link to="/">Home</Link>{' '}
            <Link to="/book/index" onClick={this.backToBooks}>Books</Link>{' '}
             
                <Link to="/user/login">Login</Link>{' '}
                <Link to="/user/register">Register</Link>{' '}
               
                

              </div>
            )}
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/book/index" component={() => <Index book={this.state.book} isEdit={this.state.sEdit} redirect={this.state.redirect} books={this.state.books} />} />
              <Route path="/book/add" component={() => <AddBook addBook={this.addBook} />} />
              <Route path="/user/login" component={() => <Login login={this.login} />} />
              <Route path="/user/register" component={() => <Register register={this.register} />} />
              {/* <Route path="user/profile" component={Profile} /> */}
              {/* <Route path="user/logout" component={Logout} /> */}
            </div>

          </Router>
        </nav>

      </div>
    )
  }
}
