import React, { Component } from 'react';
import { Table, Button, form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class editAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            id: this.props.id,
            name: this.props.name,
            email: this.props.email,
            gender: this.props.gender,
            //true: nam, false:nu
            isloading: false,
        }
        this.editAuthor = this.editAuthor.bind(this);
        // this.handleInput = this.handleInput.bind(this);
        this.cance = this.cance.bind(this);
        this.save = this.save.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    // event cance
    cance(e) {
        this.setState({
            isloading: false
        })
    }
    // event click button edit
    editAuthor(author) {

        this.setState({
            isloading: true,
        })

    }
    // event change input
    handleInput(e) {
        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: e.target.value

        });

    }
    handleCheck(e) {
        if (e.target.value == "Male") {
            this.setState({ gender: true })
        }
        else
            this.setState({ gender: false })
    }
    // event click save button
    save(e, id) {
        id = this.state.id;
        fetch('api/Author/' + id, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
                let author = [...this.state];
                author[id] = data;
            })
            .catch(error => {
                console.warn(error);
            })
        this.setState({
            isloading: false
        })
        // this.resAuthor()
        this.props.newList()

    }


    

    render() {

        return (
            <div className="EditAuthor">
                <Button color="warning" onClick={this.editAuthor}>Edit</Button>
                <Modal isOpen={this.state.isloading} toggle={this.editAuthor} className="">
                    <ModalHeader toggle={this.editAuthor}>Edit Author</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInput.bind(this)} />

                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInput.bind(this)} />
<span className="gender">
                            <Label > Male   </Label>

                            <Input type="radio" value="Male" name="gender" checked={this.state.gender} onChange={this.handleCheck} />{' '}

                            </span>


                            <Input type="radio" value="Female" name="gender" checked={!this.state.gender} onChange={this.handleCheck} />{' '}
                            <Label >
                                Female  </Label>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.cance}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

export default editAuthor;