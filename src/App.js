import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import Index from './book/Index';
import Home from './Home';
import Login from './user/Login';
import Register from './user/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { decode } from "jsonwebtoken";
import { Redirect } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      isAuth: false,
      userToken: "",
      redirect: ""
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
  }

  login = (user) => {
    axios
      .post("bookclub/user/authenticate", user)
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
            userToken: userToken
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
  render() {
    return (
      <div >
        <nav>
          <Router>
            <Redirect to={this.state.redirect} />

            <div>
              <Link to="/">Home</Link>{' '}
              <Link to="/book/index">Books</Link>{' '}
              {/* <Link to="user/profile">Profile</Link>{' '} */}
              <Link to="/user/login">Login</Link>{' '}
              {/* <Link to="user/logout">Logout</Link>{' '} */}
              <Link to="/user/register">Register</Link>
            </div>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/book/index" component={Index} />
              {/* <Route path="user/profile" component={Profile} /> */}
              <Route path="/user/login" component={() => <Login login={this.login} />} />
              {/* <Route path="user/logout" component={Logout} /> */}
              <Route path="/user/register" component={() => <Register register={this.register} />} />
            </div>
          </Router>
        </nav>
      </div>
    )
  }
}
