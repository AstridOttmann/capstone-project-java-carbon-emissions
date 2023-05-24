import {Box, Button, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";
import React, {useState} from "react";
import {User} from "../../models/MongoUserModel";
import SnackbarInfo from "../SnackBarInfo";
import UsageDialog from "../UsageDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ResetDialog from "../ResetDialog";

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
   // compareRoutesList: CompareRoutes[],
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    deleteComparisonById: (id: string) => void,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();

    const message: string = "The buttons show the bonus of the respective option. Click the one you use and save the bonus directly to your account";
    const buttonText: string = "*save CO₂-bonus"

    const [open, setOpen] = useState(false);
    const dialogContent: string = "Deleting the comparison is final and cannot be reversed. Do you want to continue?"

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete() {
        props.deleteComparisonById(props.compareRoutes.id);
        setOpen(false);
    }

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
                <UsageDialog compareRoutes={props.compareRoutes}/>
                <Button size="small" variant="text" color="error" onClick={handleClickOpen}
                        sx={{alignSelf: "start", minWidth: "fit-content", m: "0", p: "0"}}>
                    <DeleteIcon sx={{fontSize: 25}}/>
                </Button>
                <ResetDialog dialogContent={dialogContent}
                             open={open}
                             handleClose={handleClose}
                             onReset={handleDelete}
                             buttonAgreeText={"Yes, delete!"}
                             buttonDisagreeText={"No, keep it!"}
                />
            </Box>
        </Paper>
    )
}