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
                      <input type="text" className="name" placeholder="First Name" name="firstName" onChange={this.handleChange}/>  
                      <input type="text" className="name" placeholder="Last Name" name="lastName" onChange={this.handleChange}/>  
                      <input type="text" className="email" placeholder="email"name="email" onChange={this.handleChange}/>           
                      <input type="password" className="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                      <input type="password" className="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange}/>
                  </div>
                  <div className="button-container">
                    <div className="btns">
                      <button className="btn btn-primary"><i class="fab fa-facebook-f"></i>Sign up with <span>Facebook</span></button>
                      <button className="btn btn-danger"><i class="fa fa-google"></i>Sign up with <span>Google</span></button>
                    </div>  
                    <button className="login-signup-button" onClick={() => {this.handleSubmit()}}>Signup</button>
                  </div>
                </div>         
         </Modal> 

         <Modal show={this.state.showLogin} onHide={ this.state.showSignup}>
         <div className="form">
                  <div className="sign-up">
                      <span class="fa fa-user"></span>
                      <input type="text" className="email" placeholder="email"name="email" onChange={this.handleChange}/>          
                      <br></br>
                      <span class="fa fa-lock"></span>
                      <input type="password" className="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                  </div>
                  <div className="button-container">
                    <div className="btns">
                    <button className="btn btn-primary"><i class="fab fa-facebook-f"></i> Login with <span>Facebook</span></button>
                    <button className="btn btn-danger"><i className="fa fa-google"></i> Login with <span>Google</span></button>
                    </div>  
                    <button className="login-signup-button" onClick={() => {this.handleLogin()}}>Login</button>
                  </div>
                </div>   
          </Modal>
      </>
    );
  }
}

