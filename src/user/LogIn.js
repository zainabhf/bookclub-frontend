
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userLogin: {}
        }
    }


    loginHandler = () => {
        console.log("you're in login handel")
        this.props.login(this.state.userLogin);
    }


    changeHandler = (e) => {
        let temp = { ...this.state.userLogin }
        temp[e.target.name] = e.target.value;

        this.setState({
            userLogin: temp
        })
        console.log("temp");
        console.log(temp);
        console.log("user");
        console.log(this.state.userLogin);
    }

    render() {

        return (

            <div>

            <Container>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>


                    <Button variant="primary" block onClick={this.loginHandler}>Login</Button>
                </Container>
            </div>

//   <div className="container">
//                 <div className="form-box">
//                     <div className="header-form">
//                         <h1> Login </h1>
//                         {/* <div className="image">
//                         </div> */}
//                     </div>
//                     <div className="body-form">

//                         <form>
//                             <div className="input-group mb-3">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text"><i class="fa fa-user"></i></span>
//                                 </div>
//                                 <input className="form-control" type="email" name="emailAddress" onChange={this.changeHandler}  placeholder="Email Address" />
//                             </div>
//                             <div className="input-group mb-3">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text"><i class="fa fa-lock"></i></span>
//                                 </div>
//                                 <input className="form-control" type="password" name="password" onChange={this.changeHandler} placeholder="Password" />
//                             </div>
                            
//                         <Button variant="primary" block onClick={this.loginHandler}>Login</Button>
//                             {/* <button type="button" className="btn btn-secondary btn-block" onClick={this.loginHandler}>LOGIN</button> */}
//                             <div className="message">
//                             </div>
//                         </form>

//                     </div>
//                 </div>
//             </div>
    

        )
    }
}
// ReactDOM.render(
// <Login/>, 
// document.getElementById('root'));