import Form from "./Form";
import {Button, ButtonGroup, Box, Typography, Container} from "@mui/material";
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

const sxStyleBox1 = {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "4rem",
    top: "7rem",
    pb: "4rem",
    pt: "1rem",
    m: "0 auto"
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
    alignSelf: "center",
    m: "1rem auto"

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

    const message: string = "Enter two routes with different options to travel. Co2-emissions for both routes will be calculated and compared.";
    const buttonText: string = "*click for more infos";

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
        <Box sx={sxStyleBox1}>
            {!addMode && !props.isEditMode && routesToCompare.length === 0 &&
                <Container maxWidth="md">
                    <Typography variant="h4" component="h2"
                                sx={sxStyleTitle}>Welcome {props.user.username}!</Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem", mt: "4rem"}}>
                        <ButtonGroup
                            sx={sxStyleButtonGroup}
                            orientation="vertical"
                            variant="text"
                            aria-label="add button group"
                        >
                            <Button>
                                <AddLocationAltIcon sx={{fontSize: 70}} onClick={() => setAddMode(!addMode)}/>
                            </Button>
                            <Button variant="text" size="large" onClick={() => setAddMode(!addMode)}>
                                <Typography variant="body1" sx={{fontSize: "1.5rem"}}>Add Route</Typography>
                            </Button>
                        </ButtonGroup>
                        <SnackbarInfo message={message} buttonText={buttonText}/>
                    </Box>
                </Container>}

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
