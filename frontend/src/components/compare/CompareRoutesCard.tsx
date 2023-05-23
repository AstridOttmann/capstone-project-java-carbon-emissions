import {Box, Card, Divider} from "@mui/material";
import {Route} from "../../models/RouteModel";
import RouteDestination from "../routes/RouteDestination";
import RouteIconBox from "../routes/RouteIconBox";
import RouteInfo from "../routes/RouteInfo";

const sxStyleCard = {
    p: "1rem",
    m: "1rem auto"
}

type CompareRoutesCardProps = {
    route: Route
}
export default function CompareRoutesCard(props: CompareRoutesCardProps) {
    return (
        <Card variant="outlined" sx={sxStyleCard}>
            <RouteDestination route={props.route}/>
            <Box sx={{display: "flex", justifyContent: "center", m: "2rem auto"}}>
                <RouteIconBox route={props.route}/>
                <Divider orientation="vertical" variant="middle" flexItem sx={{m: "0 0.5rem", width: "3px"}}/>
                <RouteInfo route={props.route}/>
            </Box>
        </Card>
    )
}