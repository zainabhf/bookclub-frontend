import React, { Component } from 'react'

export default class Detail extends Component {
constructor(props) {
    super(props)

    this.state = {  
    }
}
    render() {
        return (

            <div>
             { (this.props.book != null) ?
                <div>
                {this.props.book.bookName}
                <img src={this.props.book.image}/>
                {this.props.book.description}
                {this.props.book.authorName}
                {this.props.book.numberOfpages}
                {this.props.book.publish}
                {this.props.name}
                <button onClick={()=>{this.props.deleteBook(this.props.book.id)}}>Delete</button>
                <button onClick={()=>{this.props.editView(this.props.book.id)}}>Edit</button>
                <hr />
                </div>:
                <h1>Nothig to show</h1>}
            </div>
        )
    }
}
