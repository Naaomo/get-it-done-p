import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignup: false,
      showLogin: false,
      fullName: "",
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
    this.setState({[name]: value});
  }

  handleLogin = async () => {
     await fetch('/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch(err => console.log(err));
    this.handleModelLogin()
    document.location.reload();
  }

  handleSignUp = async () => {
      await fetch('/auth/register', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
              fullName: this.state.fullName,
              email: this.state.email,
              password: this.state.password
          })
      })
          .then(response => response.json())
          .then(json => {
              console.log(json);
          })
          .catch(err => console.log(err));
      this.handleModelSign();
      this.handleModelLogin();
  }

  render() {
    return (
      <>
          <li className="nav-item mx-2 pt-1"><a className="rounded px-3 btn btn-md btn-success" onClick={() => this.handleModelSign()}>Sign Up</a></li>
          <li className="nav-item mx-2 pt-1"><a className="rounded px-3 btn btn-md btn-success" onClick={() => this.handleModelLogin()}>Login</a></li>
          <Modal show={this.state.showSignup} 
                 onHide={() => this.handleModelSign()}>
              <Modal.Header>
                  <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <div className="form-group">
                          <input className="form-control" placeholder="Name" type="text" name="fullName" onChange={(event) => this.handleChange(event)}/>
                      </div>
                      <div className="form-group">
                          <input type="email" className="form-control" placeholder="Email" name="email" onChange={(event) => this.handleChange(event)}/>
                      </div>
                      <div className="form-group">
                          <input type="password" className="form-control" placeholder="Password" name="password" onChange={(event) => this.handleChange(event)}/>
                      </div>
                      <div className="form-group">
                          <button className="btn btn-success rounded " onClick={() => {this.handleSignUp()}}>Signup</button>
                      </div>
                  </div>
                  <div className="container">
                      <div className="form-row">
                          <div className="form-group col-md-6 col-sm-6">
                              <a href='http://localhost:5000/auth/facebook' className="btn btn-md btn-primary rounded"><i className="fab fa-facebook-f"></i>&nbsp;&nbsp;Sign up with Facebook</a>
                          </div>
                          <div className="form-group col-md-6 col-sm-6">
                              <a href='http://localhost:5000/auth/google' className="btn btn-md btn-danger rounded"><i className="fa fa-google"></i>&nbsp;&nbsp;Sign up with Google</a>
                          </div>
                      </div>
                  </div>
              </Modal.Body>
         </Modal> 

         <Modal show={this.state.showLogin} onHide={() => this.handleModelLogin()}>
             <Modal.Header>
                 <Modal.Title>Sign Up</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div className="container">
                     <div className="input-group mb-2">
                         <div className="input-group-prepend">
                             <div className="input-group-text"><span className="fa fa-user"></span></div>
                         </div>
                         <input type="text" className="form-control" placeholder="email" name="email" onChange={(event) => this.handleChange(event)}/>
                     </div>
                     <div className="input-group mb-2">
                         <div className="input-group-prepend">
                             <div className="input-group-text"><span className="fa fa-lock"></span></div>
                         </div>
                         <input type="password" className="form-control" placeholder="Password" name="password" onChange={(event) => this.handleChange(event)}/>
                     </div>
                     <div className="form-group">
                         <button className="btn btn-md btn-success rounded" onClick={() => {this.handleLogin()}}>Login</button>
                     </div>
                     <div className="form-row">
                         <div className="form-group col-md-6 col-sm-6">
                             <a href='http://localhost:5000/auth/facebook' className="btn btn-md btn-primary rounded"><i className="fab fa-facebook-f"></i> Login with Facebook</a>
                         </div>
                         <div className="form-group col-md-6 col-sm-6">
                             <a href='http://localhost:5000/auth/google' className="btn btn-md btn-danger rounded"><i className="fa fa-google"></i> Login with Google</a>
                         </div>
                     </div>
                 </div>
             </Modal.Body>
         </Modal>
      </>
    );
  }
}

