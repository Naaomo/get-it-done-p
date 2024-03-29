import React from 'react';
import './App.css';
import GiveService from "./components/GiveService";
import GetService from './components/GetService';
import Login from './components/Login';
import Main from './components/Main';
import MapView from "./components/MapView";
import Profile from "./components/Profile"
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
        let cookieArr = [];
        let cookieData = {};
        if(document.cookie){
            //userID=2; displayName=Naomi
            //!sometimes userID is missing upon refresh
            cookieArr = document.cookie.replace("'", "").replace(" ", "").split(';');

            cookieArr.forEach((e,i) => {
                var data = e.split('=')
                cookieData[data[0].trim()] = decodeURIComponent(data[1]);
            })

            return cookieData
        }else{
            return false;
        }
    }

  render() {
      return (
          <div className="app">
              <Router>
                  <nav className="py-3 navbar navbar-expand-lg absolute-top navbar-light" style={{top: 0}}>
                      <div className="container">
                          {/*<Link className="navbar-brand d-flex fixed-top" style={{left: 400, top:11}} to="/"><span></span><img src="./images/logo.png"/></Link>*/}
                          <Link className="navbar-brand d-flex" to="/"><span></span><img src="./images/logo.png"/></Link>
                          <button className="navbar-toggler" type="button" data-toggle="collapse"
                                  data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false"
                                  aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbar-content">
                              <ul className="navbar-nav ml-auto">
                                  <Login cookieData={this.translateCookie()}/>
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
                      <GiveService/>
                  </Route>
                  <Route exact path="/map">
                      <MapView />
                  </Route>
                  <Route exact path="/profile">
                      <Profile cookieData={this.translateCookie()}/>
                  </Route>
              </Router>
          </div>
    );
  }
}

export default App;
