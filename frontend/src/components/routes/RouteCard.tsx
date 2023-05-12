import {Button, ButtonGroup, Card} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";
import {Route} from "../../models/RouteModel";

import RouteVehicleIcon from "./RouteVehicleIcon";
import RouteInfo from "./RouteInfo";

const sxStyleCard = {
    p: "1rem",
    mb: "1rem",
    backgroundColor: "#282c34",
    color: "#3fd44d",
    borderColor: "#3fd44d",
}

type RouteCardProps = {
    route: Route,
}
export default function RouteCard(props: RouteCardProps) {
    const {deleteRoute} = useContext(RoutesContext)
    const navigate = useNavigate();

    function onDeleteClick() {
        deleteRoute(props.route.id)
    }

    return (<>
        {props.route &&
            <Card variant="outlined" sx={sxStyleCard}>
                <small> ID: {props.route.id}</small>
                <RouteVehicleIcon route={props.route}/>
                <RouteInfo route={props.route}/>
                <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                             variant="text"
                             aria-label="text button group">
                    <Button variant="outlined"
                            onClick={() => navigate(`/routes/details/${props.route.id}`)}>Details</Button>
                    <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                            onClick={onDeleteClick}>Delete</Button>
                </ButtonGroup>
            </Card>}
    </>)
}