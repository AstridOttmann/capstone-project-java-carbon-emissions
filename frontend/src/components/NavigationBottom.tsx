import React, {SyntheticEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigationAction, BottomNavigation, Paper} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {RouteContext} from "../contexts/RouteContextProvider";
import DifferenceIcon from '@mui/icons-material/Difference';
import LoginIcon from "@mui/icons-material/Login";
import {User} from "../models/MongoUserModel";

type NavigationBottomProps = {
    setIsEditMode: (arg0: boolean) => void,
    user: User
}

export default function NavigationBottom(props: NavigationBottomProps) {
    const {resetRoute} = useContext(RouteContext);
    const [value, setValue] = useState('/');
    const navigate = useNavigate();
  //  const authenticated = props.user !== undefined && props.user !== "anonymousUser"

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
        navigate(newValue)
        props.setIsEditMode(false)
        resetRoute();
    };

    return (
        <Paper sx={{
            position: "fixed",
            zIndex: 1,
            bottom: 0
        }}>
            <BottomNavigation sx={{
                backgroundColor: "#3fd44d",
                borderRadius: 1,
                width: "100vw"
            }} value={value} onChange={handleChange}>
                {props.user.id === "" &&
                <BottomNavigationAction
                    label="login"
                    value="/login"
                    icon={<LoginIcon/>}
                />}
                <BottomNavigationAction
                    label="home"
                    value="/"
                    icon={<HomeIcon/>}
                />
                <BottomNavigationAction
                    label="routes"
                    value="/routes"
                    icon={<ListAltIcon/>}
                />
                <BottomNavigationAction
                    label="compared"
                    value="/compared"
                    icon={<DifferenceIcon/>}
                />
            </BottomNavigation>
        </Paper>
    )
}