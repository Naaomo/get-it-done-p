import React from 'react';
import './App.css';
import GiveService from './components/GiveService';
import GetService from './components/GetService';
import Login from './components/Login';
import Search from './components/Search';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import Demo from './components/calendar';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  };


  render() {
      let pageCookie = 'This is the frontend'
      if(document.cookie){
          pageCookie = `Your page cookies are ${document.cookie}`;
      }
      return (
          <Router>
              <div>
                  <nav className="py-3 navbar navbar-expand-lg sticky-top navbar-light" style={{top: 0}}>
                      <div className="container">
                          <Link to="/"><a className="navbar-brand py-0" href="/"><span></span><img src="./images/logo.png"/></a></Link>
                          <button className="navbar-toggler" type="button" data-toggle="collapse"
                                  data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false"
                                  aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbar-content">
                              <ul className="navbar-nav ml-auto">
                                  <li className="nav-item mx-1"><Link to="/services">Do-ers</Link></li>
                                  <Login />
                              </ul>
                          </div>
                      </div>
                  </nav>
                  <Switch>
                      <Route path="/">
                          <Main/>
                      </Route>
                      <Route path="/services">
                          <GiveService/>
                      </Route>
                      <Route path="/getService">
                          <GetService />
                      </Route>
                  </Switch>
              </div>
              {/*</div>*/}
              {/*<div>*/}
              {/*  <Search />*/}
              {/*</div>*/}
              {/*<p>{pageCookie}</p>*/}
              {/* <Demo /> */}
          </Router>
      );
  }
}

export default App;
