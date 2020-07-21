import React from 'react';
import './App.css';
// import GiveService from './components/GiveService';
import GetService from './components/GetService';
import Login from './components/Login';
import Search from './components/Search';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Switch, Route, Link, NavLink } from "react-router-dom";
// import Demo from './components/calendar';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      referrer: null
    }
  };
  searchPage = (searchClicked) => {
    this.setState({
      isSearchClicked: searchClicked
    })
  }

  render() {
      let pageCookie = 'This is the frontend'
      if(document.cookie){
          pageCookie = `Your page cookies are ${document.cookie}`;
      }
      const {referrer} = this.state;
        if (referrer) return <Router><Redirect to={referrer} /></Router> 
      return (
          <div>
                  <Router>
                      <nav className="py-3 navbar navbar-expand-lg sticky-top navbar-light" style={{top: 0}}>
                          <div className="container">
                              <a className="navbar-brand py-0" href="/"><span></span><img src="./images/logo.png"/></a>
                              <button className="navbar-toggler" type="button" data-toggle="collapse"
                                      data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false"
                                      aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                              </button>
                              <div className="collapse navbar-collapse" id="navbar-content">
                                  <ul className="navbar-nav ml-auto">
                                      {/*<li className="nav-item mx-1"><NavLink to="/">Home</NavLink></li>*/}
                                      <Login />
                                  </ul>
                              </div>
                          </div>
                      </nav>
                      {/* <Route path="/getService">
                        <GetService />
                      </Route> */}
                </Router>
              <Main searchPage={(searchClicked) => this.searchPage(searchClicked)}/>
              {/*</div>*/}
              {/*<div>*/}
              {/*  <Search />*/}
              {/*</div>*/}
              {/*<p>{pageCookie}</p>*/}
              {/* <Demo /> */}
          </div>
      );
  }
}

export default App;
