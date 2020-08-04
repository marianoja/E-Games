import React from 'react';
import './styles/auth.css';
import { signUp } from '../../store/actions/User'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login'


export class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            primarypassword: "",
            secondpassword: "",
        }
    }

    setParam = (e) => {
        var firstName = "";
        var lastName = "";
        if (e.target.name === "fullName") {
            var array = e.target.value.split(" ");
            firstName = array[0];
            lastName = array[1];
            this.setState({
                firstName: firstName,
                lastName: lastName
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    sentUser = e => {
        e.preventDefault();
        if (this.state.primarypassword != this.state.secondpassword) {
            alert("Passwords not match")
        }
        else {
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.primarypassword,
            }
            this.props.addUser(user)
        }
    }

    googleSign = u => {
        console.log("entre")
        let profile = u.getBasicProfile();
        let name = profile.getName().split(" ")
        const user = {
            firstName: name[0],
            lastName: name[1],
            email: profile.getEmail(),
            password: "Google"
        }
        this.props.addUser(user);
    }




    render() {
        return (
            <div className="signup">
                <div className="container">
                    <div className="card bg-light">
                        <article className="card-body mx-auto">
                            <h4 className="card-title mt-3 text-center">Create Account</h4>
                            <p className="text-center">Get started with your free account</p>
                            <GoogleLogin
                                clientId="870017209327-02mvpijapaq1hl8cgsdcj7h997gspa9b.apps.googleusercontent.com"
                                buttonText="Sign up with Google"
                                onSuccess={this.googleSign}
                            />
                            <p className="divider-text">
                                <span className="bg-light">OR</span>
                            </p>
                            <form onSubmit={this.sentUser.bind(this)}>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input onChange={this.setParam} name="fullName" className="form-control" placeholder="Full name" type="text" />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input onChange={this.setParam} name="email" className="form-control" placeholder="Email address" type="email" />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input onChange={this.setParam} name="primarypassword" className="form-control" placeholder="Create password" type="password" />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input onChange={this.setParam} name="secondpassword" className="form-control" placeholder="Repeat password" type="password" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                                </div>
                                <p className="text-center">Do you have an account? <a href="/login">Log In</a> </p>
                            </form>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => dispatch(signUp(user))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)