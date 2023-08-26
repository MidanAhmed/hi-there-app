import "../styles/LandingPage.css"
import SignIn from "../components/SignIn"
import htSvg from "../assets/ht.svg";

export default function LandingPage({ setIsAuth }) {
    return (
        <div className="container">
            <img className="hero-img" src={htSvg} alt="ht logo" />
            <p className="hero"><span>h</span>i <span>t</span>here is an instant messaging app, all you need is a google account to get started. It focuses on streamlining the way we connect to each other even more.</p>
            <SignIn setIsAuth={setIsAuth} />
        </div>
    )
}