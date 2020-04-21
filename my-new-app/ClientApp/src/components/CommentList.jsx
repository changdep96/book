import React, { Component } from 'react'
import Comment from "./Comment"

export default class CommentList extends Component {
    render()
   {
       console.log("đã vào render commenlist")
       const {data}=this.props;
       

        return (
            <div className="CommentList">
                <h1>đã vào commernt list</h1>
               
                {
                    data.map((listComment)=>(
                        console.log("đã vào map"),
                        <Comment  author={listComment.author} title={listComment.title}/>
                        
                    )
                      

                    )
                }
                  
                
                 
            </div>
        );
    }
    
}
