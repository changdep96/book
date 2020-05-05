import React, { Component } from 'react'
import EditAuthor from './EditAuthor';
import AddAuthor from './AddAuthor'
import { Table } from 'reactstrap'
import { Button } from "reactstrap";

export default class ItemAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: []

        }
        this.updateState = this.updateState.bind(this);
        // this.getAll=this.getAll.bind(this)
    }
    componentDidMount() {
        this.getAll()

    }
    getAll() {
        fetch('/api/Author')
            .then(res => res.json())
            .then(data => {
                this.setState({ authors: data })
            })
            .catch(error => {
                console.warn(error);
            })
    }

    updateState(newList) {
        alert("you have just one update")

        this.getAll()


    }



    render() {

        return (
            <tbody>
                {
                    this.state.authors.map(author => (
                        <tr key={author.authorId}>
                            <td>{author.authorId}</td>

                            <td>{author.name}</td>
                            <td>{author.email}</td>
                            <td>{author.gender ? "Male" : "Female"}</td>


                            <td>
                                <EditAuthor key={author.authorId} id={author.authorId} name={author.name} email={author.email} gender={author.gender} newList={this.updateState} />
                                <Button newList={this.updateState} color="danger">Delete</Button>{' '}
                                
                            </td>
                        </tr>
                    )
                    )
                }

            </tbody>

        )
    }
}
