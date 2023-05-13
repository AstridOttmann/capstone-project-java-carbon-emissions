import {Box, Button, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {MongoUser} from "../models/MongoUserModel";

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
    user: MongoUser,
    onLogout:()=> Promise<string | number | void>
}
export default function Header(props: HeaderProps) {
    const navigate = useNavigate();
    console.log("header", props.user);

    function logoutOnClick() {
        props.onLogout()
            .then(() => {
                navigate("/login");
            })
            .catch(error => console.error(error));
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