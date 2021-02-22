import React, { Component } from 'react'

export default class Detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        console.log(this.props.book)
        return (

            <div>
                { (this.props.book != null) ?
                    <div>
                        <img src={this.props.book.image} alt="Book image" />
                        <p>Title: {this.props.book.bookName}</p>
                        <p>By: {this.props.book.authorName}</p>
                        <p>{this.props.book.description}</p>

                        <p>Pages: {this.props.book.numberOfpages}</p>
                        <p>Publishing Date: {this.props.book.publish}</p>
                        <button onClick={() => { this.props.deleteBook(this.props.book.id) }}>Delete</button>
                        <button onClick={() => { this.props.editView() }}>Edit</button>
                        <hr />
                    </div>
                    :
                    <h1>Nothig to show</h1>}
            </div>
        )
    }
}
