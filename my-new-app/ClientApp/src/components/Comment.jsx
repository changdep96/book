import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div className="comment">
                stt:{this.props.id}
              <h2 className="commentAuthor">
            {this.props.author}</h2> 
           <h3>{this.props.title}</h3>
            </div>
        )
    }
}
