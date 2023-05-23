import {Box, Button, ButtonGroup, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {User} from "../models/MongoUserModel";
import React from "react";

const sxStyleBox1 = {
    width: "100%",
    position: "fixed",
    zIndex: 1500,
    left: 0,
    top: 0
}

const sxStyleBox2 = {
    width: "80%",
    m: "0 auto",
    mt: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}

type HeaderProps = {
    user: User,
    onLogout: () => void
}
export default function Header(props: HeaderProps) {
    const navigate = useNavigate();

    function logoutOnClick() {
        props.onLogout()
        navigate("/login");
    }

    return (
        <Box sx={sxStyleBox1}>
            <Box sx={sxStyleBox2}>
                <Typography variant="h5" component="h1"
                            color="primary"
                            fontWeight="bold"
                            gutterBottom
                >Move Green!</Typography>
                {props.user.id !== "" &&
                    <ButtonGroup variant="text" sx={{display: "flex", alignItems: "center"}}>
                        <PersonOutlineIcon/>
                        <Button color="inherit" type="button" onClick={logoutOnClick}><LogoutIcon/></Button>
                    </ButtonGroup>
                }
            </Box>
            <Divider variant="middle" sx={{height: "3px", width: "80%", m: "0 auto", p: "0.05rem"}}/>
        </Box>
    )
}