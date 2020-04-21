import React, { Component } from 'react'

export default class CommetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            author: '',
            title: ''
        };
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
        this.commentSubmit=this.commentSubmit.bind(this);
        
    }
    handleAuthor(e){
        this.setState({author:e.target.value});
    }
    handleTitle(e){
        this.setState({title:e.target.value});
    }
    commentSubmit(e){
        e.prevenDefault();
        const author=this.state.author;
        const title=this.state.title;
        if(!title || !author){ return;}
        this.props.commentSubmit({author:author,title:title});
        this.setState({author:"", text:""});

    }
  


    render() {
        return (
            <div>
                <h2>đã vào form</h2>
                <form className="commentForm" onSubmit={this.commentSubmit}>
                    <input type="text" value={this.state.author} placeholder="yourname" onChange={this.handleAuthor} />
                   <br/> <input type="text" value={this.state.title} placeholder="say something" onChange={this.handleTitle} />
                    <input type="submit" value="Post" />

                </form>
            </div>
        )
    }
}
