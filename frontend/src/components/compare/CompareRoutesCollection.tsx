import {Container, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import CompareRoutesComponent from "./CompareRoutesComponent";
import {User} from "../../models/MongoUserModel";
import React from "react";

const sxStyleContainer = {
    position: "relative",
    top: "5rem",
    p: "1rem",
    pb: "3rem",
}

const sxStyleTitle = {
    p: "1rem",
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
        <Container maxWidth="md" sx={sxStyleContainer}>
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            {props.compareRoutesList.map((element) => {
                return <CompareRoutesComponent key={element.id}
                                               user={props.user}
                                               updateScore={props.updateScore}
                                               compareRoutes={element}
                                               compareRoutesList={props.compareRoutesList}
                                               setCompareRoutes={props.setCompareRoutes}
                                               updateComparison={props.updateComparison}
                                               getAllComparisonByUserId={props.getAllComparisonByUserId}
                                               deleteComparisonById={props.deleteComparisonById}
                />
            })}
        </Container>
    )
}