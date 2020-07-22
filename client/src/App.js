import React from 'react';
import './App.css';
import GiveServiceNaomi from './components/GiveServiceNaomi';
import GetService from './components/GetService';
import Login from './components/Login';
import Main from './components/Main';
import MapView from "./components/MapView";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Link, NavLink } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      providers: []
    }
  };
  getProviders = (providersData) => {
    this.setState({
      providers: providersData
    })
  }

  //repeated function?
    translateCookie = () => {
        let pageCookie = ''
        let cookieArr = [];
        let cookieData = {};
        if(document.cookie){
            // pageCookie = document.cookie}`;
            //userID=2; displayName=Naomi
            cookieArr = document.cookie.replace("'", "").replace(" ", "").split(';');

            cookieArr.forEach((e,i) => {
                var data = e.split('=')
                cookieData[data[0]] = data[1];
            })

            return cookieData
            // console.log(cookieData)
        }else{
            return false;
        }
    }

  render() {
      const {referrer} = this.state;
      return (
        <div>
                  <Router>
                      <nav className="py-3 navbar navbar-expand-lg sticky-top navbar-light" style={{top: 0}}>
                          <div className="container">
                              <Link className="navbar-brand py-0" to="/"><span></span><img src="./images/logo.png"/></Link>
                              <button className="navbar-toggler" type="button" data-toggle="collapse"
                                      data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false"
                                      aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                              </button>
                              <div className="collapse navbar-collapse" id="navbar-content">
                                  <ul className="navbar-nav ml-auto">
                                    <li className="nav-item mx-2 pt-3"><Link to="/services">Become a do-er!</Link></li>
                                      <Login />
                                  </ul>
                              </div>
                          </div>
                
                      </nav>
                  <Route exact path="/">
                      <Main getProviders={(providersData) => this.getProviders(providersData)}/>
                  </Route>
                  <Route exact path="/getService">
                      <GetService providersList = {this.state.providers} />
                  </Route>
                  <Route exact path="/services">
                      <GiveServiceNaomi/>
                  </Route>
                  <Route exact path="/map">
                      <MapView />
                  </Route>
              </Router>
          </div>
    );
  }
}

export default App;
