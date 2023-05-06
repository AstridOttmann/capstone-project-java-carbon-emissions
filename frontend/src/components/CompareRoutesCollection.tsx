import {Paper, Typography} from "@mui/material";
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesComponent from "./CompareRoutesComponent";

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
   // comparedRoutes: CompareRoutes,
    comparedRoutesList: CompareRoutes[]
}
export default function CompareRoutesCollection(props: CompareRoutesCollectionProps) {
    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            {props.comparedRoutesList.map((element) => {
                return <CompareRoutesComponent key={element.id} comparedRoutes={element}/>
            })}
        </Paper>
    )
}