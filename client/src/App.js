import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import GiveService from './components/GiveService';
import GetService from './components/GetService';
// import Home from './components/Home';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignup: false,
      showLogin: false,
      // setShow: false,
      email: "",
      password: "",
      errorMessage: ""
    };

  }
  handleModelSign = () => {
    this.setState({ 
      showSignup: !this.state.showSignup
    });
  };
  handleModelLogin = () => {
    this.setState({ showLogin: !this.state.showLogin});
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    this.handleModelLogin()
  }
  handleSubmit = () => {
    // fetch('/users', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // })
    // .then((response) => {
    //   console.log("data: ", repsonse.data);
    // })
    // .catch((error) => {
    //   console.log("Error: ", error.response)
        // this.setState({
        //   errorMessage: error.response.data.message
        // })
    // })
    this.handleModelSign();
  }
  render() {
    return (
      <>
      <div className="login_nav_container">
          <Router>
            <div> 
            <ul className="links">
              {/* <li>
                <Link to="/">Home </Link>
              </li> */}
              <li>
                <Link to="/giveService">Give service </Link>
              </li>
              <li>
                <Link to="/getService">Receive service</Link>
              </li>
            </ul>
              <Switch>
                {/* <Route path="/">
                  <Login />
                </Route> */}
                <Route path="/giveService">
                  <GiveService />
                </Route>
                <Route path="/getService">
                  <GetService />
                </Route>
              </Switch>
            </div>
          </Router>
          <Button onClick={() => this.handleModelSign()}>Sign Up</Button>
          <Button onClick={() => this.handleModelLogin()}>Login</Button>
          <Modal show={this.state.showSignup}>
            <Modal.Header>
              Sign up now!
            </Modal.Header>
            <Modal.Body>
                <form>
                  <input type="text" name="email" onChange={this.handleChange} />
                  <input type="password" name="password" onChange={this.handleChange}/>
                  {/* <button onClick={this.handleLogin}>Sign up</button> */}
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => {this.handleSubmit()}}>Submit</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showLogin}>
            <Modal.Header>
              Login
            </Modal.Header>
            <Modal.Body>
                <form>
                  <input type="text" name="email" onChange={this.handleChange} />
                  <input type="password" name="password" onChange={this.handleChange}/>
                  {/* <button onClick={this.handleSubmit}>Log in</button> */}
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => {this.handleLogin()}}>Login</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default App;
