import { useQueryClient } from '@tanstack/react-query';
import { signOut, getAuth } from "firebase/auth";
import app from "@/firebase/config";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";

const auth = getAuth(app);

export const LogoutButton = () => {
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            queryClient.clear();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MenuItem onClick={handleLogout} disableRipple>
            <LogoutIcon className="mr-2" />
            Logout
        </MenuItem>
    );
};
