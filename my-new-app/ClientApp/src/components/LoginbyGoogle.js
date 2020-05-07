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
        const googleRespose={
            FullName:res.profileObj.name,
            Email:res.profileObj.email,
    
            id_token:res.tokenId,
            access_token:res.accessToken,
            Image:res.profileObj.imageUrl,
            ProviderId:'google'
        };
        debugger;
        axios.post('https://localhost:5001/api/login/google',googleRespose)
        .then((resual)=>{
            let resjson =resual;
            sessionStorage.setItem('userData', JSON.stringify(resual))
            this.setState({googleRespose})
       
        });
    }
    
    render() {
        const responseGoogle=(response)=>{
            console.log(response);
            var res= response.profileObj;
            console.log(res);
            this.signup(response)
            
            
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
  
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            
                            ></GoogleLogin>
           
                        </div>
        
                        <div className="col-sm-4"></div>
           
                      </div>
            
                    </div>
            
                  </div>
        );
    }
}

export default LoginbyGoogle;