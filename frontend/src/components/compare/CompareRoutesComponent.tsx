import {Box, Button, ButtonGroup, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";
import React from "react";
import {User} from "../../models/MongoUserModel";
import AccordionComponent from "../AccordionComponent";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from '@mui/material/Accordion';
import CheckIcon from '@mui/icons-material/Check';

const sxStylePaper = {
    p: "1rem",
    pb: "2rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

type CompareRoutesComponentProps = {
    user: User,
    setUser: (user: User) => void,
    updateScore: (id: string, user: User) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    deleteComparisonById: (id: string) => void,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();

    function onDeleteClick() {
        props.deleteComparisonById(props.compareRoutes.id);
    }

    return (
        <Paper sx={sxStylePaper}>
            {props.compareRoutes.compared.map((route) => {
                return <CompareRoutesCard key={route.id} route={route}/>
            })}
            <AccordionComponent/>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                borderRadius: 1,
                mt: "0.5rem"
            }}>
                <CompareRoutesResults user={props.user} setUser={props.setUser} updateScore={props.updateScore}
                                      compareRoutes={props.compareRoutes} setCompareRoutes={props.setCompareRoutes}
                                      updateComparison={props.updateComparison}
                                      getAllComparisonByUserId={props.getAllComparisonByUserId}/>
            </Box>

            <Accordion disabled={props.compareRoutes.comparisonResults.usages?.length === 0}
                sx={{backgroundColor: "#454C5A", color: "#3fd44d", mt: "0.5rem"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    {props.compareRoutes.comparisonResults.usages?.length > 0 ?
                        <><CheckIcon/>
                            <Typography>Usages</Typography></> :
                        <Typography>No Usages</Typography>}
                </AccordionSummary>
                <AccordionDetails>
                    {props.compareRoutes.comparisonResults.usages?.map((usage) => {
                        return <Typography>{usage.datetime}: {usage.bonus} kg/CO2</Typography>
                    })}
                </AccordionDetails>
            </Accordion>
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}
                         variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/compared/details/${props.compareRoutes.id}`)}>Details</Button>
                <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                        onClick={onDeleteClick}>Delete</Button>
            </ButtonGroup>
        </Paper>
    )
}