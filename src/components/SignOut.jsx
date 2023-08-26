import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import '../styles/SignOut.css'

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function SignOut({ setIsAuth, setRoomId }) {

    const signout = async () => {
        try {
            await signOut(auth);
            cookies.remove("token");
            cookies.remove("roomid");
            setIsAuth(null);
            setRoomId(null);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button className="sign-out-btn" onClick={signout}>Sign out</button>
    )
}