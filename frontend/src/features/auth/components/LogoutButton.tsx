import { signOut, getAuth } from "firebase/auth";
import app from "@/firebase/config";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";

const auth = getAuth(app);

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MenuItem onClick={handleLogout} disableRipple>
            <LogoutIcon />
            Logout
        </MenuItem>
    );
};

export default LogoutButton;
