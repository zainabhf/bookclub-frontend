import React, { Component } from 'react'
import axios from 'axios'
export default class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:""
        }
    }
    
    componentDidMount(){
        axios.get("/bookclub/user/profile?id=1")
            .then(response =>{
                console.log(response)
                this.setState({
                   user: response.data
                })
            })
            .catch(error =>{
                console.log(" Error profile ");
                console.log(error);
            })


    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
