import Form from "./Form";
import {Box, Button, ButtonGroup, Paper, Typography} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import React, {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CompareRoutesComponent from "./CompareRoutesComponent";
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./CompareRoutesCard";
import CompareRoutesResults from "./CompareRoutesResults";
import {Routes} from "react-router-dom";


type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
    // addComparison: (compareRoutes: { routesToCompare: Route[] })=> void
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
        //setRoutesToCompare([])
    }

    return (
        <Paper sx={{
            pb: "4rem",
            pt: "1rem",
            backgroundColor: "#282c34"
        }}>
            {!addMode && !props.isEditMode && !routesToCompare &&
                <ButtonGroup
                    sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: "0.5rem", m: "1rem"}}
                    variant="text"
                    aria-label="text button group">
                    <Button variant="outlined"
                            onClick={() => setAddMode(!addMode)}><AddLocationIcon/>
                        Add Route
                    </Button>
                </ButtonGroup>}

            {!addMode && routesToCompare.length === 1 && routesToCompare.map((route) => {
                return (
                    <>
                        <CompareRoutesCard key={route.id} route={route}/>
                        <ButtonGroup sx={{display: "flex", gap: "1rem", justifyContent: "space-between", p: "1rem"}}>
                            <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}>
                                Delete Route
                            </Button>

                            {/*  <ButtonGroup sx={{display: "flex", justifyContent: "center"}}>*/}
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
            {!addMode && routesToCompare.length === 2 && routesToCompare.map((route) => {
                return <CompareRoutesResults key={route.id} route={route}/>
            })}
            {!addMode && routesToCompare.length === 2 &&
                <>
                    <Box>
                        <Typography>
                            You can reduce your CO2-Emission
                            by {props.comparedRoutes.comparisonResults.difference}
                        </Typography>
                    </Box>
                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}>
                        <Button variant="outlined" endIcon={<SaveIcon/>} onClick={handleAdd}>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </>}

            {addMode || props.isEditMode ?
                    <Form isEditMode={props.isEditMode}
                          setIsEditMode={props.setIsEditMode}
                          setAddMode={setAddMode}
                          setRoutesToCompare={setRoutesToCompare}
                          routesToCompare={routesToCompare}
                        /* comparedRoutes={props.comparedRoutes}
                         setComparedRoutes={props.setComparedRoutes}*/
                    /> : null
            }
        </Paper>
    )
}