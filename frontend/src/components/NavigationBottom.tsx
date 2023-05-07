import React, {SyntheticEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigationAction, BottomNavigation, Paper} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {RouteContext} from "../contexts/RouteContextProvider";
import DifferenceIcon from '@mui/icons-material/Difference';

type NavigationBottomProps = {
    setIsEditMode: (arg0: boolean) => void
}

export default function NavigationBottom(props: NavigationBottomProps) {
    const {resetRoute} = useContext(RouteContext);
    const [value, setValue] = useState('/');
    const navigate = useNavigate();

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