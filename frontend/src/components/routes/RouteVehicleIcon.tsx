import {Box, Typography} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import {Route} from "../../models/RouteModel";

type RouteVehicleIconProps = {
    route: Route
}
export default function RouteVehicleIcon(props: RouteVehicleIconProps) {
    return (
        <Box sx={{}}>
            <Typography>
                {props.route.vehicle.type === "car" && <DirectionsCarIcon sx={{fontSize: 40}}/>}
                {props.route.vehicle.type === "publicTransport" && <TrainIcon sx={{fontSize: 40}}/>}
                {props.route.vehicle.type === "flight" && <FlightIcon sx={{fontSize: 40}}/>}
                {props.route.vehicle.type === "bike" && <DirectionsBikeIcon sx={{fontSize: 40}}/>}
            </Typography>
            {/*    <Typography>
                {props.route.start.toUpperCase() + " - " + props.route.destination.toUpperCase()}
            </Typography>*/}
        </Box>
    )
}