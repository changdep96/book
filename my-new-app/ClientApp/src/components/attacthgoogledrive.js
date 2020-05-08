import React, { Component } from 'react'
import axios from 'axios'
export default class attacthgoogledrive extends Component {
constructor(props) {
    super(props);
    this.state={
        data:[]
    }
    this.attach=this.attach.bind(this);
}
attach(e){
    axios.get('https://localhost:5001/attach/google')
    .then((response)=> {
        // handle success
        console.log(response);
      });
    
}

    render() {
        
        return (
            <div>
                <button onClick={this.attach}> attach google</button>
            </div>
        )
    }
}
