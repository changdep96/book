/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import Logintbygoogle from './LoginbyGoogle'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";



import connect from '../lib/connect'
import * as actions from '../actions/account'

import avatar from '../assets/img/faces/face-3.jpg'

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      firstFocus: false,
      lastFocus: false
    }
  }
  login = (e) => {
    e.preventDefault();
    this.props.actions.login(this.state.userName, this.state.password)
        
}
  render() {
    const {userName,password,firstFocus,lastFocus}= this.state;
    return (
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../assets/img/faces/face-3.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("../assets/img/faces/face-3.jpg")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? "input-group-focus" : "")
                        
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="UserName..."
                        type="text"
                       value={userName}
                       onFocus={()=>this.setState({firstFocus:true})}
                       onBlur={()=>this.setState({firstFocus:false})}
                       onChange={e=>this.setState({userName:e.target.value})}
                          ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                    }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      value={password}
                        placeholder="Password..."
                        type="password"
                        onFocus={() => this.setState({ firstFocus: true })}
                        onBlur={() => this.setState({ firstFocus: false })}
                       onChange={e=>this.setState({password:e.target.value})}
                          ></Input>
                    </InputGroup>
                  </CardBody>
                  {
                    this.props.account.error && (
                      <div className="text-red">{this.props.account.error}</div>
                    )
                  }
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={this.login}
                      size="lg"
                    >
                      Login
                          </Button>
                     <div className="pull-left">
                                  <h6>
                                      <a
                                          className="link"
                                          href="#pablo"
                                          onClick={e => e.preventDefault()}
                                      >
                                          Create Account
                                  </a>
                                  </h6>
                              </div>
                              <div className="pull-right">
                                  <h6>
                                      <a
                                          className="link"
                                          href="#pablo"
                                          onClick={e => e.preventDefault()}
                                      >
                                          Need Help?
                                  </a>
                                  </h6>
                              </div> 
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>

          <Logintbygoogle/>

          
        </div>
      </div>
    );
  }
}

export default connect(SignIn, state => (
  { account: state.account }
), actions)
