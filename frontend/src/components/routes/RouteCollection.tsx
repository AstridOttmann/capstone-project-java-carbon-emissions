import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import './RouteCollection.css'

import RouteCard from "./RouteCard";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";


const sxStylePaper = {
    position: "relative",
    top: "6rem"
}
const sxStyleBox = {
    display: "flex",
    justifyContent: "flex-start",
    overflowX: "scroll",
    position: "relative",
    pt: "1rem",
    pb: "3rem"
}
const sxStyleTitle = {
    textAlign: "center",
    p: "1rem",
}

export default function RouteCollection() {
    const {routes} = useContext(RoutesContext)
    if (!Array.isArray(routes)) {
        return null; // Oder  Meldung rendern
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>
                My Routes
            </Typography>
            <Box sx={sxStyleBox}>
                <ul className="route-list">
                    {routes.map((route) => {
                        return (
                            <RouteCard key={route.id} route={route}/>
                        )
                    })}
                </ul>
            </Box>
        </Paper>
    )
}

