import htSvg from "../assets/ht.svg";
import SignOut from "./SignOut";
import '../styles/Navbar.css'

export default function Navbar({ setIsAuth, setRoomId }) {
    return (
        <div className="nav-container">
            <img className="nav-logo" src={htSvg} alt="ht logo" />
            <SignOut setIsAuth={setIsAuth} setRoomId={setRoomId} />
        </div>
    )
}