import {Box, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";
import React from "react";
import {User} from "../../models/MongoUserModel";

import CardButtonGroup from "../CardButtonGroup";
import SnackbarInfo from "../SnackBarInfo";
import UsageDialog from "../UsageDialog";

const sxStylePaper = {
    p: "1rem",
    pb: "1rem",
    mb: "2rem",
    elevation: "3",
    /*  border: "1px solid #cd5300"*/
}

type CompareRoutesComponentProps = {
    user: User,
    updateScore: (id: string, bonus: number) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    deleteComparisonById: (id: string) => void,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();
    const message: string = "The buttons show the bonus of the respective option. Click the one you use and save the bonus directly to your account";
    const buttonText: string = "*save Co2-bonus"

    function onDeleteClick() {
        props.deleteComparisonById(props.compareRoutes.id);
    }

    function onDetailsClick() {
        navigate(`/compared/details/${props.compareRoutes.id}`)
    }

    return (
        <Paper sx={sxStylePaper}>
            <Box sx={{display: "flex", gap: "1rem"}}>
                {props.compareRoutes.compared.map((route) => {
                    return <CompareRoutesCard key={route.id} route={route}/>
                })}
            </Box>
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

            {props.compareRoutes.comparisonResults.usages?.length > 0 ?
                <UsageDialog compareRoutes={props.compareRoutes}/> : null}

            <CardButtonGroup onDeleteClick={onDeleteClick} onDetailsClick={onDetailsClick}/>

            {/*   <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}
                         variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/compared/details/${props.compareRoutes.id}`)}>Details</Button>
                <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                        onClick={onDeleteClick}>Delete</Button>
            </ButtonGroup>*/}
        </Paper>
    )
}