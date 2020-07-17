import React from 'react';
import './App.css';
import GiveService from './components/GiveService';
import GetService from './components/GetService';
import Login from './components/Login';
import Search from './components/Search'
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
          <div>
              <div className="login_container">
                  <Router>
                      <ul className="links">
                          <li>
                              <NavLink to="/giveService" style={{color:'black'}} className="nav_link">Give service </NavLink>
                          </li>
                          <li>
                              <NavLink to="/getService" style={{color:'black'}} className="nav_link">Get service</NavLink>
                          </li>
                      </ul>
                      <Switch>
                          <Route path="/giveService">
                              <GiveService />
                          </Route>
                          <Route path="/getService">
                              <GetService />
                          </Route>
                      </Switch>
                  </Router>
                  <Login />
              </div>
              <Search />
              <p>{pageCookie}</p>
              {/* <Demo /> */}
          </div>
      );
  }
}

export default App;
