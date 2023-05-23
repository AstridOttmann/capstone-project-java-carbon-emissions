import {Box, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";
import React from "react";
import {User} from "../../models/MongoUserModel";

import SnackbarInfo from "../SnackBarInfo";
import UsageDialog from "../UsageDialog";
import DeleteDialog from "../DeleteDialog";

const sxStylePaper = {

    p: "1rem",
    pb: "1rem",
    mb: "2rem",
    elevation: "3",
    borderBottom: "2px solid #cd5300"
}

type CompareRoutesComponentProps = {
    user: User,
    updateScore: (id: string, bonus: number) => void,
    compareRoutes: CompareRoutes,
    compareRoutesList: CompareRoutes[],
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    deleteComparisonById: (id: string) => void,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();
    const message: string = "The buttons show the bonus of the respective option. Click the one you use and save the bonus directly to your account";
    const buttonText: string = "*save Co2-bonus"

    return (
        <Paper sx={sxStylePaper}>
            <Box sx={{display: "flex", gap: "1rem", m: "0 auto"}}>
                {props.compareRoutes.compared.map((route) => {
                    return <CompareRoutesCard onClick={() => navigate(`/routes/details/${route.id}`)} key={route.id}
                                              route={route}/>
                })}
            </Box>
            <Box>
                <SnackbarInfo message={message} buttonText={buttonText}/>
                <Box sx={{
                    display: "flex",
                    gap: "1rem",
                    borderRadius: 1,
                    mt: "0.5rem"
                }}>
                    <CompareRoutesResults user={props.user} updateScore={props.updateScore}
                                          compareRoutes={props.compareRoutes} setCompareRoutes={props.setCompareRoutes}
                                          updateComparison={props.updateComparison}
                                          getAllComparisonByUserId={props.getAllComparisonByUserId}/>
                </Box>
                <UsageDialog compareRoutes={props.compareRoutes}
                             compareRoutesList={props.compareRoutesList}/>
                <DeleteDialog compareRoutes={props.compareRoutes}
                              deleteComparisonById={props.deleteComparisonById}/>
            </Box>
        </Paper>
    )
}