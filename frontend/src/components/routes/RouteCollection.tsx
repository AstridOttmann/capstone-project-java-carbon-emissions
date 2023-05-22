import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import './RouteCollection.css'

import RouteCard from "./RouteCard";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";

const sxStyleBox = {
    position: "relative",
    top: "5rem",
    p: "1rem",
    pb: "3rem",
   zIndex: 0
}
const sxStyleTitle = {
    p: "1rem",
}

export default function RouteCollection() {
    const {routes} = useContext(RoutesContext)
    if (!Array.isArray(routes)) {
        return null; // Oder  Meldung rendern
    }

    return (
      /*  <Paper sx={sxStylePaper}>*/
        <Box sx={sxStyleBox}>
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>
                My Routes
            </Typography>
            <ul className="route-list">
                {routes.map((route) => {
                    return (
                        <RouteCard key={route.id} route={route}/>
                    )
                })}
            </ul>
        </Box>
      /*  </Paper>*/
    )
}

