import {
    Paper,
    Typography
} from "@mui/material";
import {Route} from "../models/RouteModel";
import './RouteCollection.css'

import RouteCard from "./RouteCard";

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

type RouteCollectionProps = {
    routes: Route[],
   // route: Route,
    deleteRoute: (id: string) => void
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
                       <RouteCard deleteRoute={props.deleteRoute} key={route.id} route={route}/>
                )})}
            </ul>
        </Paper>
    )
}

