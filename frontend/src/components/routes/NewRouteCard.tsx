import {Box, Card, Divider} from "@mui/material";
import RouteDestination from "./RouteDestination";
import RouteIconBox from "./RouteIconBox";
import RouteInfo from "./RouteInfo";
import {Route} from "../../models/RouteModel";

const sxStyleCard = {
    p: "1rem",
    mb: "1rem",
    border: "4px solid #fff",
}

type NewRouteCardProps = {
    route: Route,
}
export default function NewRouteCard(props: NewRouteCardProps) {
    return (
        <>
            {props.route &&
                <Card variant="outlined" sx={sxStyleCard}>
                    <RouteDestination route={props.route}/>
                    <Box sx={{display: "flex", justifyContent: "center", m: "2rem auto"}}>
                        <RouteIconBox route={props.route}/>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{m: "0 0.5rem", width: "3px"}}/>
                        <RouteInfo route={props.route}/>
                    </Box>
                </Card>}
        </>
    )
}