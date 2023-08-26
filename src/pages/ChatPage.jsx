import Chat from "../components/Chat";
import ChatNavbar from "../components/ChatNavbar";

export default function ChatPage({ setIsAuth, setRoomId, roomId }) {
    return (
        <div className="container">
            <ChatNavbar setIsAuth={setIsAuth} setRoomId={setRoomId} roomId={roomId} />
            <Chat roomId={roomId} />
        </div>
    )
}