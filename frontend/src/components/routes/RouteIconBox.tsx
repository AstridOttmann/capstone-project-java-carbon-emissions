import RouteVehicleIcon from "./RouteVehicleIcon";
import {Route} from "../../models/RouteModel";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import React from "react";
import {Box, Typography} from "@mui/material";

type RouteIconBoxProps = {
    route: Route
}
export default function RouteIconBox(props: RouteIconBoxProps) {
    return (
        <Box sx={{width: "50%", mt: "0.3rem", textAlign: "center"}}>
            <Typography> <RouteVehicleIcon route={props.route}/></Typography>
            <Typography><PeopleAltOutlinedIcon sx={{fontSize: 40}}/></Typography>
            <Typography sx={{fontSize: "1.8rem"}}>CO2</Typography>
        </Box>
    )

}