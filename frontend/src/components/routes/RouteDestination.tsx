import {Box, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";
import RouteIcon from "@mui/icons-material/Route";
import RotateRightIcon from "@mui/icons-material/RotateRight";

type RouteDestinationProps = {
    route: Route
}
export default function RouteDestination(props: RouteDestinationProps) {
    return (
        <Box sx={{textAlign: "center", mb: "2rem"}}>
            <Typography noWrap sx={{fontSize: "1.2rem"}}>
                {props.route.start}
            </Typography>
            <Typography sx={{mt: "0.5rem"}}>
                {props.route.oneWay ? <RouteIcon/> : <RotateRightIcon/>}
            </Typography>
            <Typography noWrap sx={{fontSize: "1.2rem"}}>
                {props.route.destination}
            </Typography>
        </Box>
    )
}