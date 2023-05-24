import React, {SyntheticEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigationAction, BottomNavigation, Box, Divider} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {RouteContext} from "../contexts/RouteContextProvider";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {User} from "../models/MongoUserModel";

const sxStyleBox = {
    position: "fixed",
    zIndex: 1,
    bottom: 0,
    left: 0,

}

type NavigationBottomProps = {
    setIsEditMode: (arg0: boolean) => void,
    user: User
}

export default function NavigationBottom(props: NavigationBottomProps) {
    const {resetRoute} = useContext(RouteContext);
    const [pathValue, setPathValue] = useState('/');
    const navigate = useNavigate();

    const handleChange = (event: SyntheticEvent, newPathValue: string) => {
        setPathValue(newPathValue)
        navigate(newPathValue)
        props.setIsEditMode(false)
        resetRoute();
    };

    return (
        <Box sx={sxStyleBox}>
            <Divider variant="middle" sx={{height: "3px", width: "80%", m: "0 auto"}}/>
            <BottomNavigation sx={{width: "100vw"}} value={pathValue} onChange={handleChange}>
                <BottomNavigationAction
                    disabled={props.user.id === ""}
                    label="home"
                    value="/"
                    icon={<HomeIcon/>}
                />
                <BottomNavigationAction
                    disabled={props.user.id === ""}
                    label="routes"
                    value="/routes"
                    icon={<ListAltIcon/>}
                />
                <BottomNavigationAction
                    disabled={props.user.id === ""}
                    label="compared"
                    value="/compared"
                    icon={<CompareArrowsIcon sx={{fontSize: 35}}/>}
                />
                {props.user.id !== "" &&
                    <BottomNavigationAction
                        label="account"
                        value="/account"
                        icon={<AccountCircleIcon/>}
                    />
                }
            </BottomNavigation>
        </Box>
    )
}