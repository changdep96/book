import React, { Component } from 'react'
import axios from 'axios';
import EditAuthor from './EditAuthor';
import AddAuthor from './AddAuthor'
import { Table } from 'reactstrap'
import { Button } from "reactstrap";
import ItemAuthor from "./ItemAuthor"
import Search from '../../components/search'




export default class ShowAuthor extends Component {
    
    render() {

        return (
            <div className="showAuthor">
                <Search/>
              <AddAuthor />
                <Table hover>  
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Gender</th>
                            <td>Action</td>
                        </tr>
                    </thead>
               
<ItemAuthor  />
                  </Table>

            </div>
        )
    }
}

