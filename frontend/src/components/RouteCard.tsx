import {Box, Button, ButtonGroup, Card, Typography} from "@mui/material";
import {Route} from "../models/RouteModel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";

const sxStyleCard = {
    p: "1rem",
    mb: "1rem",
    backgroundColor: "#282c34",
    color: "#3fd44d",
    borderColor: "#3fd44d",
}

type RouteCardProps = {
    route: Route,
    deleteRoute: (id: string) => void
}
export default function RouteCard(props: RouteCardProps) {
    const navigate = useNavigate();

    function onDeleteClick() {
        props.deleteRoute(props.route.id)
    }

    return (
        <Card variant="outlined" sx={sxStyleCard}>
            <small> ID: {props.route.id}</small>
            <Box sx={{display: "flex", gap: "2rem", justifyContent: "flex-start"}}>
                <Typography>{props.route.vehicle.type === "car" && <DirectionsCarIcon/>}
                    {props.route.vehicle.type === "publicTransport" && <TrainIcon/>}
                    {props.route.vehicle.type === "flight" && <FlightIcon/>}
                    {props.route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
                </Typography>
                <Typography>
                    {props.route.start.toUpperCase() + " - " + props.route.destination.toUpperCase()}
                </Typography>
            </Box>
            <Box sx={{display: "flex", gap: "2rem", justifyContent: "flex-start"}}>
                <Typography>{props.route.distance + "km"}</Typography>
                <Typography> {props.route.oneWay ? "oneWay" : "Round Trip"}</Typography>
                <Typography>{props.route.numberOfPersons + " person(s)"}</Typography>
            </Box>
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                         variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/routes/details/${props.route.id}`)}>Details</Button>
                <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                        onClick={onDeleteClick}>Delete</Button>
            </ButtonGroup>
        </Card>
    )
}