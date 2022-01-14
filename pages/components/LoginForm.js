import { OverlayTrigger,Tooltip } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';



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
                <input className="sign-input" type="text" placeholder="email" disabled />
                <input type="text" className="sign-input" placeholder="password" disabled />
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please Login with Google</Tooltip>}>
                <button className="SignIn-Btn" disabled>Sign In</button>
                </OverlayTrigger>
                <button className="Google-Btn" onClick={() => signIn()}>
                  Sign In With Google
                </button>
            </div>
            <div>
              <Image className="singIn-Img" src="/signup.jpg" alt="" height={244} width={288} />
            </div>
          </div>
        </>
      )}

      {session && (
        <>
        
        <div className="Profile">
          <h4>Hello, {session.user.name}</h4>
          <div className="google-profile-img">
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
