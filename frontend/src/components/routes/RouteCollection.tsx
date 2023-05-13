import {
    Paper,
    Typography
} from "@mui/material";
import './RouteCollection.css'

import RouteCard from "./RouteCard";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";
import {MongoUser} from "../../models/MongoUserModel";

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

type RouteCollectionProps ={
    user: MongoUser
}
export default function RouteCollection(props: RouteCollectionProps) {
    const {routes} = useContext(RoutesContext)

    const userRoutes = routes.filter((route)=> route.userId === props.user.id)

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                Single Routes
            </Typography>
            <ul className="route-list">
                {userRoutes.map((route) => {
                    return (
                        <RouteCard key={route.id} route={route}/>
                    )
                })}
            </ul>
        </Paper>
    )
}

