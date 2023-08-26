import './App.css';
import '@fontsource/poppins';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import RoomPage from './pages/RoomPage';
import { useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("token"));
  const [roomId, setRoomId] = useState(cookies.get("roomid"));

  if (isAuth && roomId) {
    return <ChatPage roomId={roomId} setRoomId={setRoomId} setIsAuth={setIsAuth} />
  }
  else if (isAuth) {
    return <RoomPage setRoomId={setRoomId} setIsAuth={setIsAuth} />
  }
  else {
    return <LandingPage setIsAuth={setIsAuth} />
  }
}

export default App
