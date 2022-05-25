import React from 'react';
import {useNavigate} from 'react-router-dom';
import { signInWithGoogle } from '../helpers/auth';

export function Redirect(){
  const navigate = useNavigate();
  async function googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
   navigate("/chat");
  }
  return (
    <div>
        <button onClick={googleSignIn()}>

        </button>
    </div>
  );
}