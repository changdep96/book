import React, { Component } from 'react'
import ListProject from './listProject'

export default class Project extends Component {
  constructor(props) {
      super(props);
      this.state={
          Project: [
              {id:1, name:"mat nghi", created:"2020-2-2 12:12", update:"2020-2-3 13:12", maneger:"hồ trang", status:1}

          ],
          id:null,
          name:"",
          created:"",
          update:"",
          maneger:"",
          status:null,

      }    
      
  }
  
    render() {
        return (
            <div>
                <ListProject data={this.state.Project}/>
            </div>
        )
    }
}
