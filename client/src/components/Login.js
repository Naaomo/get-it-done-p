import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignup: false,
      showLogin: false,
      email: "",
      password: "",
      confirmPassword: '',
      errorMessage: ""
    };

  }
//  handleClose = () => {
//    this.setState({setShow: false})
//  }
//  handleShow = () => setShow(true);

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
    const confirmPassword = event.target.value;
    const password = event.target.value;
    if (confirmPassword === password) {
      return this.setState({
        [name]: value
      });
    }
  };

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
  handleSubmit = () => {
    // fetch('/users', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
          // fname: this.state.firstName,
          // lname: this.state.lastName,
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
   
          <button className="button" onClick={() => this.handleModelSign()}>Sign Up</button>
          <button className="button" data-backdrop="non-static" data-keyboard="true" onClick={() => this.handleModelLogin()}>Login</button>
          <Modal show={this.state.showSignup} 
                 onHide={this.state.showLogin}>
                <div className="form-sign-up" >
                  <div className="sign-up">
                  <h2>Sign Up</h2>
		                <p>Please fill in this form to create an account!</p>
                      <hr/>
                      <input type="text" className="name" placeholder="First Name" name="firstName" onChange={(event) => this.handleChange(event)}/>
                      <input type="text" className="name" placeholder="Last Name" name="lastName" onChange={(event) => this.handleChange(event)}/>
                      <input type="text" className="email" placeholder="email"name="email" onChange={(event) => this.handleChange(event)}/>
                      <input type="password" className="password" placeholder="Password" name="password" onChange={(event) => this.handleChange(event)}/>
                      <input type="password" className="password" placeholder="Confirm Password" name="confirmPassword" onChange={(event) => this.handleChange(event)}/>
                  </div>
                  <div className="button-container">
                    <div className="btns">
                      <button className="btn btn-primary"><i className="fab fa-facebook-f"></i>Sign up with <span>Facebook</span></button>
                      <button className="btn btn-danger"><i className="fa fa-google"></i>Sign up with <span>Google</span></button>
                    </div>  
                    <button className="login-signup-button" onClick={() => {this.handleSubmit()}}>Signup</button>
                  </div>
                </div>         
         </Modal> 

         <Modal show={this.state.showLogin} onHide={ this.state.showSignup}>
         <div className="form">
                  <div className="sign-up">
                      <span className="fa fa-user"></span>
                      <input type="text" className="email" placeholder="email" name="email" onChange={(event) => this.handleChange(event)}/>
                      <br></br>
                      <span className="fa fa-lock"></span>
                      <input type="password" className="password" placeholder="Password" name="password" onChange={(event) => this.handleChange(event)}/>
                  </div>
                  <div className="button-container">
                    <div className="btns">
                        <a href='http://localhost:5000/auth/facebook'><button className="btn btn-primary"><i className="fab fa-facebook-f"></i> Login with <span>Facebook</span></button></a>
                        <a href='http://localhost:5000/auth/google'><button className="btn btn-danger"><i className="fa fa-google"></i> Login with <span>Google</span></button></a>
                    </div>  
                    <button className="login-signup-button" onClick={() => {this.handleLogin()}}>Login</button>
                  </div>
                </div>   
          </Modal>
      </>
    );
  }
}

