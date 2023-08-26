import ShortUniqueId from 'short-unique-id';
import { auth, db } from "../config/firebase";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import Button from '../components/Button';
import { useState, forwardRef } from 'react';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import '../styles/RoomPage.css'

const cookies = new Cookies();
const uid = new ShortUniqueId();

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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function RoomPage({ setRoomId, setIsAuth }) {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const outerTheme = useTheme();

    const [joinid, setJoinid] = useState("");

    const genRoom = async () => {
        const rid = uid();
        const newRoom = {
            ownerId: auth.currentUser.uid,
            members: [auth.currentUser.uid]
        }
        try {
            await setDoc(doc(db, "rooms", rid), newRoom);
        } catch (error) {
            console.error(error);
        }
        cookies.set("roomid", rid);
        setRoomId(cookies.get("roomid"));
    }

    const joinRoom = async () => {
        if (joinid === "") return;
        const docRef = doc(db, "rooms", joinid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            cookies.set("roomid", joinid);
            setRoomId(cookies.get("roomid"));
        } else {
            setOpen(!open)
        }
    }
    return (
        <div className='container'>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    No rooms available where room ID is "{joinid}"
                </Alert>
            </Snackbar>
            <Navbar setIsAuth={setIsAuth} setRoomId={setRoomId}/>
            <hr className='hrule' />
            <p className='room-hero'><span>Connect to each other</span> by either creating a room or join an existing one.</p>
            <div className='create-join'>
                <div className='create'>
                    <Button label="Create a room" handlefunc={genRoom} />
                </div>
                <span>OR</span>
                <div className='join'>
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField label="Enter room ID" value={joinid} onChange={e => setJoinid(e.target.value)} />
                    </ThemeProvider>
                    <Button label="Join room" handlefunc={joinRoom} />
                </div>
            </div>
        </div>
    )
}