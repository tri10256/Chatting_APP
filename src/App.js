import './styles.css';
import React, {Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
 
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {auth} from "./services/firebase";

export function PrivateRoute({authenticated,component}) {
    if(authenticated){
      return component;
    }else
    return <Navigate to = "/login"/>;
}


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
     auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
        
      } 
       else {
         this.setState({
           authenticated: false,
          loading: false //false
         });
       }
     });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">This Page is Loading...</span>
      </div>
    ) : (
        <Router>
          <Routes>

            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
           
            <Route  path = "/chat" element = { <PrivateRoute authenticated = {this.state.authenticated} component = {<Chat/>}/>}/>
           
          </Routes>
        </Router>
      );
  }
}

export default App;
