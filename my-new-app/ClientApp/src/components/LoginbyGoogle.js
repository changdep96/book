import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

class LoginbyGoogle extends Component {
    constructor(props) {
        super(props);
        this.state={

        };
        
    }
    signup(res){
        const googlrespose={
            Name:res.profileObj.name,
            email:res.profileObj.email,
            token:res.googleId,
            Image:res.profileObj.imageUrl,
            ProviderId:'google'
        };
        debugger;
        axios.post('http://localhost:60200/Api/Login/SocialmediaData',googlrespose)
        .then((resualt)=>{
            let resjson =resualt;
            sessionStorage.setItem('userData', JSON.stringify(resualt))
       this.props.history.push('/UserDashboad')
        });
    }
    
    render() {
        const responseGoogle=(response)=>{
            console.log(response);
            var res=response.profileObj;
            console.log(res);
            debugger;
            this.signup(response);
        }
        return (
            <div className="App">
            
                    <div className="row">
           
                  
           
                    </div>
          
                    <div className="row">
          
                      <div style={{ 'paddingTop': "20px" }} className="col-sm-12">
            
                        <div className="col-sm-4"></div>
         
                        <div className="col-sm-4">
          
                          <GoogleLogin
          
                            clientId="945688556250-ksjktjeqjib4p0so169o35abfmdsjpc2.apps.googleusercontent.com"
          
                            buttonText="Login with Google"
         
                            onSuccess={responseGoogle}
  
                            onFailure={responseGoogle} ></GoogleLogin>
           
                        </div>
        
                        <div className="col-sm-4"></div>
           
                      </div>
            
                    </div>
            
                  </div>
        );
    }
}

export default LoginbyGoogle;