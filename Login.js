import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { AuthService } from './AuthGuard';
import { AuthenticationService } from './services/auth.service';
import './style.css';

export class Login extends Component {
  debugger;
  authService = AuthService;
  isLoggedIn = false;
  authenticationService = new AuthenticationService();
  state = {
    toDashboard: false
  }
  constructor(props) {
    super(props);
    
  }

  getUserInfo = () => {
    return {
      email: document.getElementById('defaultLoginFormEmail').value,
      password: document.getElementById('defaultLoginFormPassword').value
    }
  }

  login = () => {
    let userInfo = this.getUserInfo();
    this.authenticationService.login(userInfo).subscribe((response) => {
      if(response.loggedIn) {
        this.setState(() => ({
            toDashboard : true
        }));
      }
    });
  }

  render() {
    if(this.state.toDashboard) {
      return <Redirect to="dashboard"/>
    }

    return (
      <div className="row justify-content-md-center">
        <div className="col-md-4 col-md-auto">
          <form className="text-center border border-light p-5 m-10" onSubmit={this.login}>

              <p className="h4 mb-4">Sign in</p>

              <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" required/>

              <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" required/>

              <div className="d-flex justify-content-around">
                  <div>
                      <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                          <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                      </div>
                  </div>
                  <div>
                      <a href="">Forgot password?</a>
                  </div>
              </div>

              <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>

              <p>Not a member?
                 <Link from="/" to='/register' >Register</Link >
              </p>

          </form>
        </div>
      </div>
    );
  }
}

