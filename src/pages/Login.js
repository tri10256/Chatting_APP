import React,{ Component} from "react";
import { Link, useNavigate} from "react-router-dom";
import {auth} from "../services/firebase";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

function landingPage({nav}){
  nav('/chat');
}
//wrap the class component in a function  and pass the constant as the props and use it
export default function Login(props){
   const nav = useNavigate();
   return <Helper {...props} nav ={nav}/>;
}
class Helper extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event,nav) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
    if(auth.currentUser){
      landingPage(this.props);
    }
  }

  async googleSignIn(nav) {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }

    if(auth.currentUser){
        landingPage(nav);
    }
  }

  async githubSignIn(nav) {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
   if(auth.currentUser){
      landingPage(nav);
   }
  }

  render() {
    return (
      <div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to
            <Link className="title ml-2" to="/">
              MyChat
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login to your account.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <button className="btn btn-primary px-5" type="submit">Login</button>
          </div>
          <p>You can also log in with any of these services</p>
           <button className="btn btn-danger mr-2" type="button" onClick={()=>{
             let {nav} = this.props;
             this.googleSignIn(nav = {nav});
           }}>
            Sign in with Google
          </button>
          <button className="btn btn-secondary" type="button" onClick={()=>{
            let {nav} = this.props;
            this.githubSignIn(nav);
            }}>
            Sign in with GitHub
          </button>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>

      </div>
    );
  }
}