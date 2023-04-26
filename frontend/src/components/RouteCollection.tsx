import {Card, Divider, Paper, Stack, styled, Typography} from "@mui/material";
import {Route} from "../models/RouteModel";
import './RouteCollection.css'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FlightIcon from '@mui/icons-material/Flight';

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
const sxStyleCard = {
    p: "1rem",
    m: "0.5rem",
    border: "1",
    borderColor: "#3fd44d"
}

const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    border: "1",
    borderColor: "#3fd44d",
    padding: "1rem",
    borderRadius: 4,
    marginBottom: "0.5rem",
}));

type RouteCollectionProps = {
    routes: Route[]
}
export default function RouteCollection(props: RouteCollectionProps) {
    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Routes
            </Typography>
            <ul className="route-list">
                {props.routes.map((route) => {
                    return (
                        <Card sx={sxStyleCard} variant="outlined"
                              key={route.id}>
                            <Typography variant="overline">Route</Typography>
                            <p>Id: {route.id}</p>
                            <Stack>
                                <Item>From: {route.start}</Item>
                                <Item>To: {route.destination}</Item>
                                <Item>Distance: {route.distance} km</Item>
                                <Item>Number of persons: {route.numberOfPersons}</Item>
                                <Item>{route.oneWay ? "oneWay" : "Round Trip"}</Item>
                            </Stack>
                            <Divider sx={{borderColor: "#808080"}}/>

                            <Typography variant="overline">Vehicle</Typography>
                            <div>
                                {route.vehicle.type === "car" && <DirectionsCarIcon/>}
                                {route.vehicle.type === "publicTransport" && <TrainIcon/>}
                                {route.vehicle.type === "flight" && <FlightIcon/>}
                                {route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
                            </div>
                            {route.vehicle.type === "car" &&
                                <Stack direction="row" gap="0.5rem">
                                    <Item>Fuel: {route.vehicle.fuel}</Item>
                                    <Item>Car size: {route.vehicle.carSize}</Item>
                                </Stack>}
                            {route.vehicle.type === "publicTransport" &&
                                <Stack direction="row" gap="0.5rem">
                                    <Item>Distance Level: <br/>{route.vehicle.distanceLevel}</Item>
                                    <Item>Means of Transport: <br/>{route.vehicle.meansOfTransport}</Item>
                                </Stack>}
                        </Card>
                    )
                })}
            </ul>
        </Paper>
    )
}