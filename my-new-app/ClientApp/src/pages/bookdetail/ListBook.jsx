import React, { Component } from 'react';
import ItemBook from "./ItemBook"
//import listProject from '../listProject';


class ListBook extends Component {
    constructor(props) {
        super(props);
        this.state={
            Book:[
             {id:1, nameBook:"trăm năm là hữu hạn", price:125.000, authorId:"1", genrer:"novel",publisher:"kim đồng",created:"2020-2-2 12:12"}  
            ],
            nameBook:"",
            authorId:"",
            genrer:"",
            price:0,
            publisher:"",
            created:""
        
        }
    }
  
 
    
    render() {
        return (
            <div className="listbook">
                <ItemBook Book={this.state.Book}></ItemBook>  
            </div>
        );
    }
}

export default ListBook;