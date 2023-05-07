import {Box, Divider, Typography} from "@mui/material";
import {Route} from "../models/RouteModel";

type RouteInfoProps = {
    route: Route
}
export default function RouteInfo(props: RouteInfoProps) {
    return (
        <>
            <Box sx={{display: "flex", gap: "2rem", justifyContent: "flex-start"}}>
                <Typography>{props.route.distance + "km"}</Typography>
                <Typography> {props.route.oneWay ? "oneWay" : "Round Trip"}</Typography>
                <Typography>{props.route.numberOfPersons + " person(s)"}</Typography>
            </Box>
            <Divider sx={{borderColor: "#808080"}}/>
            <Typography variant="h6"
                        sx={{textAlign: "center"}}>
                CO2-Emission: {props.route.co2EmissionRoute} kg/Person</Typography>
        </>
    )
}