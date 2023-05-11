import {Card} from "@mui/material";
import {Route} from "../models/RouteModel";
import RouteVehicleIcon from "./routes/RouteVehicleIcon";
import RouteInfo from "./routes/RouteInfo";

const sxStyleCard = {
    p: "1rem",
    mb: "1rem",
    backgroundColor: "#282c34",
    color: "#3fd44d",
    borderColor: "#3fd44d",
}

type CompareRoutesCardProps = {
    route: Route
}
export default function CompareRoutesCard(props: CompareRoutesCardProps) {
    return (
        <Card variant="outlined" sx={sxStyleCard}>
            <RouteVehicleIcon route={props.route}/>
           <RouteInfo route={props.route}/>
        </Card>
    )
}