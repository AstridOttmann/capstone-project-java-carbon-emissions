import Form from "./Form";
import {Button, ButtonGroup, Box, Typography} from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import React, {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./compare/CompareRoutesCard";
import {User} from "../models/MongoUserModel";
import {useNavigate} from "react-router-dom";
import SnackbarInfo from "./SnackBarInfo";

const sxStyleBox = {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "4rem",
    top: "5rem",
    pb: "4rem",
    pt: "1rem"
}
const sxStyleTitle = {
    p: "1rem",
    color: "primary",
    textAlign: "center"
}
const sxStyleButtonGroup = {
    width: "50%",
    fontSize: "large",
    gap: "0.5rem",
    mt: "1rem",
    textAlign: "center"
}


type HomePageProps = {
    user: User,
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
    getAllComparisonByUserId: (userId: string) => void,
    addComparison: (compareRoutes: CompareRoutes) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([])
    const navigate = useNavigate();

    function handleAddComparison() {
        const compareRoutesToAdd = {...props.compareRoutes, userId: props.user.id, compared: routesToCompare}
        props.setCompareRoutes(compareRoutesToAdd)
        props.addComparison(compareRoutesToAdd)
        navigate("/compared")
        setRoutesToCompare([])
    }

    function onCancelClick() {
        setAddMode(false)
        setRoutesToCompare([])
    }

    return (
        <Box sx={sxStyleBox}>
            {!addMode && !props.isEditMode && routesToCompare.length === 0 &&
                <>
                    <Typography variant="h4" component="h2"
                                sx={sxStyleTitle}>Welcome {props.user.username}!</Typography>
                    <ButtonGroup
                        sx={sxStyleButtonGroup}
                        orientation="vertical"
                        variant="text"
                        aria-label="add button group">
                        <Button>
                            <AddLocationAltIcon sx={{fontSize: 70}} onClick={() => setAddMode(!addMode)}/>
                        </Button>
                        <Button variant="text" size="large" onClick={() => setAddMode(!addMode)}>
                            <Typography variant="body1" sx={{fontSize: "1.5rem"}}>Add Route</Typography>
                        </Button>
                    </ButtonGroup>
                    <SnackbarInfo/>
                </>}

            {!addMode && routesToCompare.length === 1 && routesToCompare.map((route) => {
                return (
                    <>
                        <CompareRoutesCard key={route.id} route={route}/>
                        <ButtonGroup sx={{display: "flex", gap: "1rem", justifyContent: "space-between", p: "1rem"}}>
                            <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                                    onClick={onCancelClick}>
                                Discard
                            </Button>

                            <Button variant="outlined"
                                    onClick={() => setAddMode(!addMode)}><AltRouteIcon/>
                                Add Route To Compare
                            </Button>
                        </ButtonGroup>
                    </>
                )
            })}

            {!addMode && routesToCompare.length === 2 && routesToCompare.map((route) => {
                return <CompareRoutesCard key={route.id} route={route}/>
            })}

            {!addMode && routesToCompare.length === 2 &&
                <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}>
                    <Button variant="outlined" endIcon={<SaveIcon/>} onClick={handleAddComparison}>
                        Compare & Save
                    </Button>
                    <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                            onClick={onCancelClick}>
                        Discard
                    </Button>
                </ButtonGroup>}

            {addMode || props.isEditMode ?
                <Form user={props.user}
                      isEditMode={props.isEditMode}
                      setIsEditMode={props.setIsEditMode}
                      setAddMode={setAddMode}
                      setRoutesToCompare={setRoutesToCompare}
                      routesToCompare={routesToCompare}
                      getAllComparisonByUserId={props.getAllComparisonByUserId}
                /> : null
            }
        </Box>)
}
