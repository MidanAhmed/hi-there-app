import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import '../styles/SignIn.css'
import googleSvg from "../assets/google-logo.svg";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function SignIn({ setIsAuth }) {

    const signInWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            cookies.set("token", response.user.refreshToken);
            setIsAuth(cookies.get("token"));
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="btn-contain">
            <button onClick={signInWithGoogle} className="sign-in-btn">
                <img className="google-logo" src={googleSvg} alt="google logo"/>
                Sign in with Google
            </button>
        </div>
    )
}