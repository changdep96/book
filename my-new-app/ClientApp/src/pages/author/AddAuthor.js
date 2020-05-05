import React, { Component } from 'react'
import { Table, Button, form, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {

           
            name: "",
            email: "",
            gender: false,
            //true: nam, false:nu
            isloading: false,

        }
        this.AddAuthor = this.AddAuthor.bind(this)
        this.cance = this.cance.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleInput = this.handleInput.bind(this)

    }
    handleInput(e) {

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })

    }
    handleCheck(e) {

     this.setState({
            gender: e.target.checked
        })

    }
    save(e,name,gender,email) {
let author=[...this.state]


    
 
        
       


       
        fetch('/api/Author', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body:JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
               console.log("success",data=author);
            })

            .catch(error => {
                console.error('error',error)
            });
       
        this.setState({
            isloading: false
        })
        // this.resAuthor()

    }
    
    AddAuthor() {
        this.setState({
            isloading: true
        })
    }
    cance() {
        this.setState({
            isloading: false
        })
    }

    render() {
        return (
            <div className="AddAuthor" >
                <Button color="success" onClick={this.AddAuthor}>Add Record</Button>{' '}
                <Modal isOpen={this.state.isloading} className="" >
                    <ModalHeader toggle={this.AddAuthor}>Add author</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInput} />

                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInput} />
                            <span className="gender">
                                <Label > Male   </Label>
                                <Input type="radio" value="true" checked name="gender" onChange={this.handleCheck} />{' '}
                            </span>
                            <Input type="radio" value="false" name="gender" onChange={this.handleCheck} />{' '}
                            <Label >
                                Female  </Label>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.cance}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}
