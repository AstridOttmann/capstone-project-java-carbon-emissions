import {Paper, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import CompareRoutesComponent from "./CompareRoutesComponent";
import {User} from "../../models/MongoUserModel";
import React from "react";

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
    user: User,
   // setUser: (user: User) => void,
    updateScore: (id: string, bonus: number) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    compareRoutesList: CompareRoutes[],
    deleteComparisonById: (id: string) => void,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void
}
export default function CompareRoutesCollection(props: CompareRoutesCollectionProps) {
    console.log("compare", props.compareRoutesList)
    if (!Array.isArray(props.compareRoutesList)) {
        return null; // Oder  Meldung rendern
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            {props.compareRoutesList.map((element) => {
                return <CompareRoutesComponent key={element.id}
                                               user={props.user}
                                               updateScore={props.updateScore}
                                               compareRoutes={element}
                                               setCompareRoutes={props.setCompareRoutes}
                                               updateComparison={props.updateComparison}
                                               getAllComparisonByUserId={props.getAllComparisonByUserId}
                                               deleteComparisonById={props.deleteComparisonById}/>
            })}
        </Paper>
    )
}