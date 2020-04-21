import React, { Component } from 'react'
import CommentList from "./CommentList"
import CommentForm from "./CommetForm"

export default class CommentBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, author: "trang", title: "không hay" },
                { id: 2, author: "hồ", title: "dở tệ" }


            ],
            id:1,
            title: "",
            author: "",

        }
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.commentSubmit = this.commentSubmit.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }
    handleCommentSubmit(comment) {

    }
    handleAuthor(e) {
        this.setState({ author: e.target.value });
    }
    handleTitle(e) {
        this.setState({ title: e.target.value });
    }
    commentSubmit =even =>{
        even.prevenDefault();
        console.log("đã vào submit");
       
        const {id, author, title, list } = this.state;
console.log(title);

        this.setState({

            list: [
                ...list,
                {  id:id,
                    title: title,
                    author: author,
                }
            ],
           
         title:"",
         author:"",

        },
        console.log(title)  )
    }
    /*
    componentDidMount(){
        fetch("/comments")
        .then(res=>res.json())
        .then(data=>{
            this.setState({list:data})
  
        })
        .catch(error=>{
            console.warn(error);
        })
    }
    */


    render() {

        console.log("đã vào render commnet box");
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.list} />
                <form className="commentForm" onSubmit={this.commentSubmit}>
                    <input type="text" value={this.state.author} placeholder="yourname" onChange={this.handleAuthor} />
                    <br /> <input type="text" value={this.state.title} placeholder="say something" onChange={this.handleTitle} />
                  
                     <button onClick={this.commentSubmit} > đăng</button>

                </form>
            </div>




        );
    }
}
