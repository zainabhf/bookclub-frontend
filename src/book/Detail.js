import React, { Component } from 'react'

export default class Detail extends Component {

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
                </div>:
                <h1>Nothig to show</h1>}

            </div>
        )
    }
}
