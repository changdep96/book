import React, { Component } from 'react';

class listProject extends Component {

    render() {
        const  projectList = this.props.data;
        return (
            <div className="listProject">

                <table className="table table-dark">
                    <thead>
                     
                            
                         
                            <tr>
                            <th scope="col">stt</th>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">author</th>
                        </tr>

                       
                            
                    </thead>
                    <tbody>
                        {
                          
                         projectList.map(list=>(
                             <tr>

                        <th scope="row">{list.id}</th>
                        <td>{list.name}</td>
                        <td>{list.maneger}</td>
                        <td>{list.created}</td>
                        <td>{list.updated}</td>
                        <td>{list.status}</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                                 </tr>

                        ))}
                            
                           
                               

                    
                        

                    </tbody>
                </table>
            </div>
        );
    }
}

export default listProject;