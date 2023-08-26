import htSvg from "../assets/ht.svg";
import SignOut from "./SignOut";
import '../styles/Navbar.css';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { TextField } from "@mui/material";

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

export default function Navbar({ setIsAuth, setRoomId, roomId }) {
    const outerTheme = useTheme();
    return (
        <div className="nav-container">
            <img className="nav-logo" src={htSvg} alt="ht logo" />
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField value={roomId} variant="outlined" label="Room ID" size="small" InputProps={{
                    readOnly: true,
                }} />
            </ThemeProvider>
            <SignOut setIsAuth={setIsAuth} setRoomId={setRoomId} />
        </div>
    )
}