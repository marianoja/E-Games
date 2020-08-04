import React from 'react';
import './styles/auth.css';
import {connect} from 'react-redux'
import {loginUser} from '../../store/actions/User';


export class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }

    setParam= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    sentUser=e=>{
        e.preventDefault();
        this.props.signIn(this.state);
    }




    render(){
        return(
            <div className="login">
            <div className="container">
                <div className="card bg-light">
                <article className="card-body mx-auto">
	            <h4 className="card-title mt-3 text-center">Log in</h4>
	            <p className="text-center">Login with google account...</p>
                <a className="btn btn-block btn-social btn-google" onclick="_gaq.push(['_trackEvent', 'btn-social', 'click', 'btn-google']);">
                 <span className="fa fa-google"></span> <p className="p-google"> Sign in with Google</p>
                </a>
            	<p className="divider-text">
                <span className="bg-light">OR</span>
                </p>
	            <form onSubmit={this.sentUser.bind(this)}>
                <div className="form-group input-group">
                	<div className="input-group-prepend">
		                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
		            </div>
                      <input onChange={this.setParam} name="email" className="form-control" placeholder="Email address" type="email"/>
                </div>
                <div className="form-group input-group">
                	<div className="input-group-prepend">
		                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		            </div>
                    <input onChange={this.setParam} name="password" className="form-control" placeholder="Password" type="password"/>
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

function mapDispatchToProps(dispatch){
    return{
        signIn: user=>dispatch(loginUser(user)),
    }
}

export default connect(null,mapDispatchToProps)(Login)