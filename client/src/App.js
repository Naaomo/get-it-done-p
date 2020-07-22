import React from 'react';
import './App.css';
import GiveService from './components/GiveService';
import GetService from './components/GetService';
import Login from './components/Login';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Link, NavLink } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      referrer: null
    }
  };
  searchPage = (page) => {
    this.setState({
      referrer: page
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
                      {/* {referrer && <Route><Redirect to={referrer} /></Route>} */}
                      <Route exact path="/getService">
                        <GetService />
                      </Route>
                      <Route exact path="/">
                        <Main searchPage={(searchClicked) => this.searchPage(searchClicked)}/>
                      </Route>
                      <Route path="/services">
                          <GiveService/>
                      </Route>
                </Router>
              
      );
  }
}

export default App;
