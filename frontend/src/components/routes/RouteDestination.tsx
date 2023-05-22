import {Box, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";
import RouteIcon from "@mui/icons-material/Route";
import RotateRightIcon from "@mui/icons-material/RotateRight";

type RouteDestinationProps = {
    route: Route
}
export default function RouteDestination(props: RouteDestinationProps) {
    return (
        <Box sx={{textAlign: "center"}}>
            <Typography noWrap>{props.route.start}</Typography>
            <Typography sx={{mt: "0.5rem"}}>{props.route.oneWay ? <RouteIcon/> : <RotateRightIcon/>}</Typography>
            <Typography noWrap>{props.route.destination}</Typography>
        </Box>
    )
}