import {
    Box,
    Button,
    ButtonGroup,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {Route} from "../models/RouteModel";
import './RouteCollection.css'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FlightIcon from '@mui/icons-material/Flight';

import {useNavigate} from "react-router-dom";

const sxStylePaper = {
    p: "1rem",
    pb: "3rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d"
}
const sxStyleBox = {
    p: "0.5rem",
    border: 1,
    color: "#3fd44d",
    borderColor: "#3fd44d",
    borderRadius: 1,
    mb: "1rem"
}

type RouteCollectionProps = {
    routes: Route[]
}
export default function RouteCollection(props: RouteCollectionProps) {
    const navigate = useNavigate();

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Routes
            </Typography>
            <ul className="route-list">
                {props.routes.map((route) => {
                    return (
                        <Box sx={sxStyleBox}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemIcon sx={{color: "#3fd44d", justifyContent: "center"}}>
                                        {route.vehicle.type === "car" && <DirectionsCarIcon/>}
                                        {route.vehicle.type === "publicTransport" && <TrainIcon/>}
                                        {route.vehicle.type === "flight" && <FlightIcon/>}
                                        {route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
                                    </ListItemIcon>
                                    <ListItemText sx={{textAlign: "center"}}
                                                  primary={route.start.toUpperCase() + " - " + route.destination.toUpperCase()}/>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={route.distance + "km "}/>
                                    <ListItemText
                                        primary={route.oneWay ? "oneWay" : "Round Trip"}/>
                                    <ListItemText
                                        primary={route.numberOfPersons + " person(s)"}/>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                                                 variant="text"
                                                 aria-label="text button group">
                                        <Button variant="outlined"
                                                onClick={() => navigate(`/routes/details/${route.id}`)}>Details</Button>
                                    </ButtonGroup>
                                </ListItem>
                            </List>
                        </Box>)
                })}
            </ul>
        </Paper>
    )
}

