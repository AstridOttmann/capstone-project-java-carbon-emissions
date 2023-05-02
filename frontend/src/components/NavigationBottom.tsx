import React, {SyntheticEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigationAction, BottomNavigation} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {RouteContext} from "../contexts/RouteContextProvider";

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
        <>
            <BottomNavigation sx={{
                position: "fixed",
                zIndex: 1,
                bottom: 0, width: '100vw',
                backgroundColor: "#3fd44d",
                borderRadius: 1
            }}
                              value={value} onChange={handleChange}>
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
            </BottomNavigation>
        </>
    )
}