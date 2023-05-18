import Form from "./Form";
import {Button, ButtonGroup, Paper, Typography} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import React, {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./compare/CompareRoutesCard";
import {User} from "../models/MongoUserModel";
import {useNavigate} from "react-router-dom";

const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d",
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
        <Paper sx={{
            pb: "4rem",
            pt: "1rem",
            backgroundColor: "#282c34"
        }}>
            {!addMode && !props.isEditMode && routesToCompare.length === 0 &&
                <>
                    <Typography variant="h4" sx={sxStyleTitle}>Welcome {props.user.username}!</Typography>
                    <ButtonGroup
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                            gap: "0.5rem",
                            m: "1rem"
                        }}
                        variant="text"
                        aria-label="text button group">
                        <Button variant="outlined"
                                onClick={() => setAddMode(!addMode)}><AddLocationIcon/>
                            Add Route
                        </Button>
                    </ButtonGroup>
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
        </Paper>)
}
