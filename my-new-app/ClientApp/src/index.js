import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import Layout from './layout'

import registerServiceWorker from './registerServiceWorker';
// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import callAjax from './lib/ajax';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
 const store= createStore(reducers, compose(applyMiddleware(callAjax, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Route component={Layout}/>
     </BrowserRouter>

  </Provider>,
  document.getElementById("root")
 );



