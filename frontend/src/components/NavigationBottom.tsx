import React, {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

import {BottomNavigationAction, BottomNavigation} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function NavigationBottom() {
    const [value, setValue] = useState('/');
    const navigate = useNavigate();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(newValue)
    };

    return (
        <>
            <BottomNavigation sx={{
                position: "fixed",
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