import {Box, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";

type RouteInfoProps = {
    route: Route
}
export default function RouteInfo(props: RouteInfoProps) {
    return (
        <>
            <Box sx={{width: "50%", display: "block", gap: "2rem", justifyContent: "center"}}>
                <Typography sx={{mt: "0.4rem", textAlign: "center", fontSize: "1.2rem"}}>{props.route.distance}</Typography>
                <Typography sx={{textAlign: "center", fontSize: "1.1rem"}}>km</Typography>
                <Typography
                    sx={{mt: "1.1rem", mb: "0.6rem", textAlign: "center", fontSize: "1.2rem"}}>{props.route.numberOfPersons}</Typography>
                <Typography noWrap sx={{mt: "1.5rem", textAlign: "center", fontSize: "1.2rem"}}>{props.route.co2EmissionRoute}</Typography>
                <Typography sx={{textAlign: "center", fontSize: "1rem"}}>kg/pP</Typography>
            </Box>
        </>
    )
}