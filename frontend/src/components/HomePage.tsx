import Form from "./Form";
import {Box, Button, ButtonGroup, Paper, Typography} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import React, {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./compare/CompareRoutesCard";
import CompareRoutesResults from "./compare/CompareRoutesResults";
import CloseIcon from "@mui/icons-material/Close";
import {MongoUser} from "../models/MongoUserModel";

const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d",
    textAlign: "center"
}

type HomePageProps = {
    user: MongoUser,
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
    getAllComparison: () => Promise<void>,
    addComparison: (compareRoutes: CompareRoutes) => void,
    comparedRoutes: CompareRoutes,
    setComparedRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([])

    function handleAdd() {
        const comparedRoutesToAdd = {...props.comparedRoutes, compared: routesToCompare}
        props.setComparedRoutes(comparedRoutesToAdd)
        props.addComparison(comparedRoutesToAdd)
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
                            <Button variant="outlined" color="error" endIcon={<CloseIcon/>}
                                    onClick={onCancelClick}>
                                Cancel
                            </Button>

                            <Button variant="outlined"
                                    onClick={() => setAddMode(!addMode)}><AltRouteIcon/>
                                Add Route & Compare
                            </Button>
                        </ButtonGroup>
                    </>
                )
            })}

            {!addMode && routesToCompare.length === 2 && routesToCompare.map((route) => {
                return <CompareRoutesCard key={route.id} route={route}/>
            })}
            {!addMode && routesToCompare.length === 2 &&
                <Box sx={{display: "flex", gap: "1rem"}}>
                    {routesToCompare.map((route) => {
                        return <CompareRoutesResults key={route.id} route={route}/>
                    })}
                </Box>}
            {!addMode && routesToCompare.length === 2 &&
                <>
                    <Box>
                        <Typography variant="body1"
                                    sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                            You can reduce your CO2-Emission
                            by {routesToCompare[0].co2EmissionRoute - routesToCompare[1].co2EmissionRoute} kg
                        </Typography>
                    </Box>
                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}>
                        <Button variant="outlined" endIcon={<SaveIcon/>} onClick={handleAdd}>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                                onClick={onCancelClick}>
                            Discard
                        </Button>
                    </ButtonGroup>
                </>}

            {addMode || props.isEditMode ?
                <Form user={props.user}
                      isEditMode={props.isEditMode}
                      setIsEditMode={props.setIsEditMode}
                      setAddMode={setAddMode}
                      setRoutesToCompare={setRoutesToCompare}
                      routesToCompare={routesToCompare}
                      getAllComparison={props.getAllComparison}
                /> : null
            }
        </Paper>)
}
