import {Box, Button, ButtonGroup, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";
import React from "react";
import {User} from "../../models/MongoUserModel";

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
    getAllComparison: () => void,
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
            <Box sx={{
                display: "flex",
                gap: "1rem",
                borderRadius: 1
            }}>
                <CompareRoutesResults user={props.user} setUser={props.setUser} updateScore={props.updateScore} compareRoutes={props.compareRoutes} setCompareRoutes={props.setCompareRoutes} updateComparison={props.updateComparison} getAllComparison={props.getAllComparison}/>
            </Box>

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