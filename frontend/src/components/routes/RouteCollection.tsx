import {
    Paper,
    Typography
} from "@mui/material";
import './RouteCollection.css'

import RouteCard from "./RouteCard";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";

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

export default function RouteCollection() {
    const {routes} = useContext(RoutesContext)

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                Single Routes
            </Typography>
            <ul className="route-list">
                {routes.map((route) => {
                    return (
                        <RouteCard key={route.id} route={route}/>
                    )
                })}
            </ul>
        </Paper>
    )
}

