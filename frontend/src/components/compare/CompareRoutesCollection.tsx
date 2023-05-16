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
    setUser: (user: User) => void,
    updateScore: (id: string, user: User) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    compareRoutesList: CompareRoutes[],
    deleteComparisonById: (id: string) => void,
    getAllComparison: () => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void
}
export default function CompareRoutesCollection(props: CompareRoutesCollectionProps) {
    const userCompareRoutes = props.compareRoutesList.filter((element) =>
        element.userId === props.user.id)

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            {userCompareRoutes.map((element) => {
                return <CompareRoutesComponent key={element.id}
                                               user={props.user}
                                               setUser={props.setUser}
                                               updateScore={props.updateScore}
                                               compareRoutes={element}
                                               setCompareRoutes={props.setCompareRoutes}
                                               updateComparison={props.updateComparison}
                                               getAllComparison={props.getAllComparison}
                                               deleteComparisonById={props.deleteComparisonById}/>
            })}
        </Paper>
    )
}