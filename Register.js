import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import "./style.css";

export class Register extends Component {
  state = {
    toLogin: false
  };
  constructor(props) {
    super(props);
  }

  getUserInfo = () => {
    return {
      firstName: document.getElementById("defaultRegisterFormFirstName").value,
      lastName: document.getElementById("defaultRegisterFormLastName").value,
      email: document.getElementById("defaultRegisterFormEmail").value,
      password: document.getElementById("defaultRegisterFormPassword").value
    };
  };

  registerUser = () => {
    this.setState(() => ({
      toDashboard: false
    }));
    var flag = false;
    var signUpUser = this.getUserInfo();
    var userData = [];
    if (localStorage.getItem("users") !== null) {
      userData = JSON.parse(localStorage.getItem("users"));
    }
    userData.forEach(user => {
      if (user.email === signUpUser.email) {
        flag = true;
        alert("User Already Exists");
      }
    });
    if (!flag) {
      this.setState(() => ({
        toLogin: true
      }));
      userData.push(signUpUser);
      var users = require("./json/users.json");
      var fs = require("fs");
      users.push(signUpUser);
      fs.writeFile("./json/users.json", JSON.stringify(users), function(err) {
        console.log(err);
        console.log("users---------", users);
      });
      console.log("After fs writsere file---------", users);
      localStorage.setItem("users", JSON.stringify(userData));
      alert("User registered successfully.");
    }
  };

  render() {
    if (this.state.toLogin) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-4 col-md-auto">
          <form
            className="text-center border border-light p-5 m-10"
            onSubmit={this.registerUser}
          >
            <p className="h4 mb-4 text-center">Sign up</p>

            <input
              type="text"
              id="defaultRegisterFormFirstName"
              className="form-control mb-4"
              placeholder="First name"
              required
            />

            <input
              type="text"
              id="defaultRegisterFormLastName"
              className="form-control mb-4"
              placeholder="Last name"
              required
            />

            <input
              type="email"
              id="defaultRegisterFormEmail"
              className="form-control mb-4"
              placeholder="E-mail"
              required
            />

            <input
              type="password"
              id="defaultRegisterFormPassword"
              className="form-control mb-4"
              placeholder="Password"
              aria-describedby="defaultRegisterFormPasswordHelpBlock"
              required
            />

            <select id="Country" name="Country" className="form-control mb-4">
              <option value="selectcountry">Select Country</option>
              <option value="india">India</option>
            </select>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="form-control mb-4"
            />
            <label for="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="form-control mb-4"
            />
            <label for="female">Female</label>
            <button className="btn btn-info my-4 btn-block" type="submit">
              Sign up
            </button>

            <p>
              Already a member?
              <Link from="/register" to="/">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
