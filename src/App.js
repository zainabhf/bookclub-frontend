import React, { Component } from 'react'
import axios from  'axios';
import './App.css';
import Index from './book/Index';
import Home from './Home';
import Login from './user/Login' ;
import Register from './user/Register' ;
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user : {}
    }
  }
  
  register= (user)=> {
    axios.post(`/bookclub/user/registration`,user)
    .then(response => {
        console.log(response)
        this.setState({
            user: response.data
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
          <div>
            <Link to="/">Home</Link>{' '}
            <Link to="/book/index">Books</Link>{' '}
            {/* <Link to="user/profile">Profile</Link>{' '} */}
            <Link to="/user/login">Login</Link>{' '}
            {/* <Link to="user/logout">Logout</Link>{' '} */}
            <Link to="/user/register">Register</Link>
          </div>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/book/index" component={Index}/>
            {/* <Route path="user/profile" component={Profile}></Route> */}
            <Route path="/user/login" component={Login}/>
            {/* <Route path="user/logout" component={Logout}></Route> */}
            <Route path="/user/register"  component={() => <Register register = {this.register}/>}/>
          </div>
        </Router>
      </nav>
    </div>
    )
  }
}
