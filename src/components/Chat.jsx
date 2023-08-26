import { useEffect, useState, useRef } from "react";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import { addDoc, collection, limit, orderBy, query, serverTimestamp, onSnapshot, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import "../styles/Chat.css";

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#4e4feb',
            },
            secondary: {
                main: '#322c49',
            },
            divider: '#958bb6',
        },
        typography: {
            fontFamily: 'Poppins',
        },
        shape: {
            borderRadius: 40,
        },
    });

export default function Chat({ roomId }) {

    const dummy = useRef();

    const outerTheme = useTheme();

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("roomId", "==", roomId), orderBy("createdAt"), limit(30));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            })
            setMessages(messages);
        })
        return () => unsubscribe();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        const addNewMsg = {
            message: newMessage,
            createdAt: serverTimestamp(),
            userId: auth.currentUser.uid,
            photoURL: auth.currentUser.photoURL,
            displayName: auth.currentUser.displayName,
            roomId: roomId
        };

        try {
            await addDoc(messagesRef, addNewMsg);
        } catch (e) {
            console.error(e)
        }
        setNewMessage("");
        dummy.current.scrollIntoView({ behaviour: 'smooth' });
    }
    return (
        <div>
            <div className="msgcontainer">
                {messages.map((msg) => <div key={msg.id} className={msg.userId === auth.currentUser.uid ? "sent" : "received"}>
                    <Tooltip title={msg.displayName}>
                        <img src={msg.photoURL} alt="display picture" width="30px" height="30px" />
                    </Tooltip>
                    <span>{msg.message}</span>
                </div>)}
                <div ref={dummy}></div>
            </div>
            <form onSubmit={handleSubmit} className="msgform">
                <ThemeProvider theme={customTheme(outerTheme)}>
                    <TextField fullWidth label="Enter your message..." value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} />
                </ThemeProvider>
                <button type="submit">
                    <SendIcon sx={{ fontSize: 25, fontWeight: 600 }} />
                </button>
            </form>
        </div>
    )
}
