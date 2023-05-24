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
    const vehicleType = props.route.vehicle.type;

    return (
        <Box sx={{}}>
            <Typography component="div">
                {vehicleType === "car" && <DirectionsCarIcon sx={{fontSize: 50}}/>}
                {vehicleType === "publicTransport" && <TrainIcon sx={{fontSize: 50}}/>}
                {vehicleType === "flight" && <FlightIcon sx={{fontSize: 50}}/>}
                {vehicleType === "bike" && <DirectionsBikeIcon sx={{fontSize: 50}}/>}
            </Typography>
        </Box>
    )
}