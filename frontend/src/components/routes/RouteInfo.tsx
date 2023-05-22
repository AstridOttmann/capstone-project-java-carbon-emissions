import {Box, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";

type RouteInfoProps = {
    route: Route
}
export default function RouteInfo(props: RouteInfoProps) {
    return (
        <>
            <Box sx={{width: "50%", display: "block", gap: "2rem", justifyContent: "center"}}>
                <Typography sx={{mt: "0.3rem", textAlign: "center", fontSize: "0.9rem"}}>{props.route.distance}</Typography>
                <Typography sx={{textAlign: "center", fontSize: "0.9rem"}}>km</Typography>
                <Typography
                    sx={{mt: "0.7rem", mb: "0.5", textAlign: "center", fontSize: "0.9rem"}}>{props.route.numberOfPersons}</Typography>
                <Typography noWrap sx={{mt: "1.1rem", textAlign: "center", fontSize: "0.9rem"}}>{props.route.co2EmissionRoute}</Typography>
                <Typography sx={{textAlign: "center", fontSize: "0.9rem"}}>kg/pP</Typography>
            </Box>
        </>
    )
}