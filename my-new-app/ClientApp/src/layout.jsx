import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './lib/connect';
import Author from './pages/author/ShowAuthor'
import SignIn from './components/SignIn';

class layout extends Component {
    render() {
      if(this.props.account.loggedIn){
          return <Author/>;
      }
      return <SignIn/>
    }
}

function mapStateToProps(state) {
    return { account: state.account }
}

export default connect(layout,state=>({account:state.account}))