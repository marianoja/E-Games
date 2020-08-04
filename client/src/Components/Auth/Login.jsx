import React from 'react';
import './styles/auth.css';
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/User';
import { GoogleLogin } from 'react-google-login'

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            googleAuthenticated: false,
        }
    }

    setParam = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sentUser = e => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    googleSign = u => {
        let profile = u.getBasicProfile();
        const user = {
            email: profile.getEmail(),
            password: "Google",
            googleAuthenticated: "true",
        }
        this.props.signIn(user);
    }




    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="card bg-light">
                        <article className="card-body mx-auto">
                            <h4 className="card-title mt-3 text-center">Log in</h4>
                            <GoogleLogin
                                clientId="870017209327-02mvpijapaq1hl8cgsdcj7h997gspa9b.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSuccess={this.googleSign}
                            />
                            <p className="divider-text">
                                <span className="bg-light">OR</span>
                            </p>
                            <form onSubmit={this.sentUser.bind(this)}>
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
                                    <input onChange={this.setParam} name="password" className="form-control" placeholder="Password" type="password" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Log in </button>
                                </div>
                                <p className="text-center">New user? <a href="/signup">Register here</a> </p>
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
        signIn: user => dispatch(loginUser(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login)