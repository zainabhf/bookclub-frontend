import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newUser: {},
            isMatch:null,
            messege:null
            
        }
    }

    registerHandler = () => {
        if(this.checkPassword(this.state.newUser["password"],this.state.newUser["confirm"])){
        this.props.register(this.state.newUser);
        }
       else{
           this.setState({
               messege:"unmatch password"
           })
       }
    }
    changeHandler = (e) => {

        let temp = {...this.state.newUser}
        temp[e.target.name] = e.target.value;
        temp["image"] = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
        temp["userRole"] = "ROLE_USER"

        // if (temp["password"] == temp["confirm"]) {
        //     temp["password"] = e.target.value
        // } else {
        //     <Alert>
        //         your password is not match !
        //     </Alert>
        // }

        this.setState({

            newUser: temp,
            isMatch:this.checkPassword(this.state.newUser["password"],this.state.newUser["confirm"])

        })
        console.log(temp);
        console.log(this.state.isMatch);
    }
    checkPassword=(password,confirm)=>{
        // const check={}
        // check[e.target.name]=e.target.value
    //   check["password"]=e.target.value
    //   check["confirm"]=e.target.value
    //   console.log(check["password"])
    //   console.log(check["confirm"])
// console.log(check["confirm"])
// ("#confirm").val()
      if(password== confirm){
          return true
      }else{
          return false
      }

    }
    render() {
        
        
        const  successMessage=this.state.messege ?(
           
        
            <Alert className="alert" variant="danger"> {this.state.messege}</Alert>
           
        ):null
      
        return (
            
            <div>
                {successMessage}
                <Alert variant="success">{this.state.messege}</Alert>

                <Container>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirm" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>

            </div>
        )
    }
}