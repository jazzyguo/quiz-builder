import React, { memo } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { User } from "firebase/auth";
import { LogoutButton } from "@/features/auth";

type Props = {
    user: User
};

export const UserMenuList = memo(({ user }: Props) => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                <p className="font-bold m-0">{user.email}</p>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className=""
                disableScrollLock
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        router.push("/quiz/create");
                        handleClose();
                    }}
                    disableRipple
                >
                    <AddIcon className="mr-2" />
                    Create Quiz
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        router.push("/quiz/drafts");
                        handleClose();
                    }}
                    disableRipple
                >
                    <ModeIcon className="mr-2" />
                    Drafts
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        router.push("/quiz/published");
                        handleClose();
                    }}
                    disableRipple
                >
                    <DoneAllIcon className="mr-2" />
                    Published
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <LogoutButton />
            </Menu>
        </div>
    );
});
