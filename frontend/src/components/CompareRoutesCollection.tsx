import {Paper, Typography} from "@mui/material";
import RouteCard from "./RouteCard";
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./CompareRoutesCard";
import CompareRoutesComponent from "./CompareRoutesComponent";
import {Route} from "../models/RouteModel";

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

type CompareRoutesCollectionProps = {
    routesToCompare: Route[]
}
export default function CompareRoutesCollection(props: CompareRoutesCollectionProps) {
    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            <CompareRoutesComponent routesToCompare={props.routesToCompare}/>

        </Paper>
    )
}