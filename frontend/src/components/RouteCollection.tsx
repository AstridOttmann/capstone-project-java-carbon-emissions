import {Card, Paper, Typography} from "@mui/material";
import {Route} from "../models/RouteModel";
import './RouteCollection.css'
import {NavLink} from "react-router-dom";

type RouteCollectionProps = {
    routes: Route[]
}

const sxStyle = {
    m: "1rem",
    p: "1rem",
    pb: "3rem",
    backgroundColor: "#282c34",
    elevation: "3"
}
export default function RouteCollection(props: RouteCollectionProps) {
    return (
        <Paper sx={sxStyle}>
            <Typography variant="h3" component="h3" sx={{fontSize: "2rem", p: "1rem", color: "#3fd44d"}}>My
                Routes</Typography>
            <ul className="route-list">
                {props.routes.map((route) => {
                    return (
                        <Card sx={{p: "1rem", m: "1rem", border: "1", borderColor: "#3fd44d"}} variant="outlined"
                              key={route.id}>
                            <Typography variant="overline">Route</Typography>
                            <p>Id: {route.id}</p>
                            <p>From: {route.start}</p>
                            <p>To: {route.destination}</p>
                            <p>Distance: {route.distance} km</p>
                            <p>Number of persons: {route.numberOfPersons}</p>
                            <p>{route.oneWay ? "oneWay" : "Round Trip"}</p>
                            <Typography variant="overline">Vehicle</Typography>
                            <p>Vehicle: {route.vehicle.type}</p>
                            {route.vehicle.type === "car" &&
                                <div>
                                    <p>Fuel: {route.vehicle.fuel}</p>
                                    <p>Car size: {route.vehicle.carSize}</p>
                                </div>}
                            {route.vehicle.type === "publicTransport" &&
                                <div>
                                    <p>Distance level: {route.vehicle.distanceLevel}</p>
                                    <p>Means of Transport: {route.vehicle.meansOfTransport}</p>
                                </div>}
                        </Card>
                    )
                })}
            </ul>
            <NavLink className="start-link" to="/">⬅️ Back</NavLink>
        </Paper>
    )
}