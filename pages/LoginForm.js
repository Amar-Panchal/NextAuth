import React from 'react'
import { OverlayTrigger,Tooltip } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';

function LoginForm() {
    const [session, loadingSession] = useSession();

  if (loadingSession) {
    return <p className="loading">Loading....</p>;
  }
    return (
    <div>
        {!session && (
            <>
          <div className="SignIn-Form d-flex justify-content-center mx-auto">
            <div>
                <input type="text" placeholder="email" disabled />
                <input type="text" placeholder="password" disabled />
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please Login with Google</Tooltip>}>
                <button className="SignIn-Btn" disabled>Sign In</button>
                </OverlayTrigger>
                <button className="Google-Btn" onClick={() => signIn()}>
                  Sign In With Google
                </button>
            </div>
            <div>
              <img className="singIn-Img" src="/signup.jpg" alt="" />
            </div>
          </div>
        </>
      )}

      {session && (
        <>
        <Navbar />
        <div className="Profile">
          <h4>Hello, {session.user.name}</h4>
          <div className={styles.boxCenter}>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <br />
          <button className="SignOut-Btn" onClick={() => signOut()}>
            Sign Out
          </button>
          </div>
        </>
      )}
    </div>
    )
}

export default LoginForm
