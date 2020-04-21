import React, { Component } from 'react';
import { Route } from 'react-router';
//import CommentBox from "./components/CommentBox"

import './custom.css';
//import Project from "./pages/Project"
//import Signing from "./components/SignIn"
import ListBook from './pages/bookdetail/ListBook';




export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     <div className="showbook">
       <ListBook/>

     </div>
   
    )
  }
}
