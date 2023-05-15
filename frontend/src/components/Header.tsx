import {Box, Button, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {User} from "../models/MongoUserModel";

const sxStyleTypo = {
    fontSize: "2rem",
    flexGrow: "3",
    textAlign: "center",
    p: "1rem"
}

const sxStyleBox = {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "center",
    p: "1rem"
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
        <header>
            <Box sx={sxStyleBox}>
                <Typography variant="h1" sx={sxStyleTypo}>Move Green!</Typography>
                {props.user.id !== "" &&
                    <Button type="button" onClick={logoutOnClick}><LogoutIcon/></Button>}
            </Box>
            <Divider sx={{borderColor: "#808080"}}/>
        </header>
    )
}