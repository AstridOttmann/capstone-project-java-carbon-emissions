import {Box, Card, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";
import {Route} from "../../models/RouteModel";
import RouteInfo from "./RouteInfo";
import RouteDestination from "./RouteDestination";
import RouteIconBox from "./RouteIconBox";
import CardButtonGroup from "../CardButtonGroup";

const sxStyleCard = {
    textAlign: "center",
    width: "48%",
    p: "1rem",
    mb: "1rem",
    border: "4px solid #fff",
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

    function onDetailsClick() {
        navigate(`/routes/details/${props.route.id}`)
    }

    return (
        <>
            {props.route &&
                <Card variant="outlined" sx={sxStyleCard}>
                    <RouteDestination route={props.route}/>
                    <Box sx={{display: "flex", justifyContent: "center", m: "2rem auto"}}>
                        <RouteIconBox route={props.route}/>
                        <Divider orientation="vertical"
                                 variant="middle"
                                 flexItem
                                 sx={{m: "0 0.5rem", width: "3px"}}/>
                        <RouteInfo route={props.route}/>
                    </Box>
                    <CardButtonGroup onDeleteClick={onDeleteClick}
                                     onDetailsClick={onDetailsClick}/>
                </Card>}
        </>
    )
}