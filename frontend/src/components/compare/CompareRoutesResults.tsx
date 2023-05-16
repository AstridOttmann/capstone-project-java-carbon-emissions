import {Box, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";

type CompareRoutesResultsProps = {
    route: Route
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 1,
            width: "50%",
            backgroundColor: "#3fd44d"
        }}>
            <Typography sx={{textAlign: "center"}}>{props.route.vehicle.type}</Typography>
            <Typography sx={{textAlign: "center"}}>{props.route.co2EmissionRoute}</Typography>
        </Box>
    )
}