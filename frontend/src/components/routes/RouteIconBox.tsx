import RouteVehicleIcon from "./RouteVehicleIcon";
import {Route} from "../../models/RouteModel";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Co2Icon from '@mui/icons-material/Co2';
import React from "react";
import {Box, Typography} from "@mui/material";

type RouteIconBoxProps = {
    route: Route
}
export default function RouteIconBox(props: RouteIconBoxProps) {
    return (
        <Box sx={{width: "50%", mt: "0.3rem", textAlign: "center"}}>
            <Typography component="div">
                <RouteVehicleIcon route={props.route}/>
            </Typography>
            <Typography component="div">
                <PeopleAltOutlinedIcon sx={{fontSize: 45, m: "0.8rem 0"}}/>
            </Typography>
            <Typography component="div" sx={{fontSize: "1.8rem"}}>
                <Co2Icon sx={{fontSize: 60, m: "-0.5rem"}}/>
            </Typography>
        </Box>
    )

}