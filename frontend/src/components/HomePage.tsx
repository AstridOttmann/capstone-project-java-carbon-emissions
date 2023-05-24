import Form from "./Form";
import {Button, ButtonGroup, Box, Typography, Container, Paper} from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import React, {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import {CompareRoutes} from "../models/CompareRoutesModel";
import {User} from "../models/MongoUserModel";
import {useNavigate} from "react-router-dom";
import SnackbarInfo from "./SnackBarInfo";
import CheckIcon from "@mui/icons-material/Check";
import NewRouteCard from "./routes/NewRouteCard";

const sxStyleBox1 = {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    top: "8rem",
    pb: "4rem",
    m: "0 auto"
}
const sxStylePaper = {
    m: "1rem 3rem",
    p: "2rem 1rem 2rem 1rem",
    position: "relative",
    /*   top: "4rem",
       p: "1rem",
       pb: "3rem",*/
    elevation: "10"
}

const sxStyleTitle = {
    p: "1rem",
    color: "primary",
    textAlign: "center"
}
const sxStyleButtonGroup = {

    fontSize: "large",
    gap: "0.5rem",
    /*alignSelf: "center",*/
    m: "3rem auto"

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

    const message: string = "Enter two routes with different options to travel. CO2-emissions for both routes will be calculated and compared.";
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
                    <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
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
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <NewRouteCard key={route.id} route={route}/>
                            <ButtonGroup
                                sx={{display: "flex", gap: "9rem", justifyContent: "space-between", p: "1rem"}}>
                                <Button variant="text" color="error" onClick={onCancelClick}>
                                    <DeleteIcon sx={{fontSize: 30}}/>
                                </Button>
                                <Button variant="text" onClick={() => setAddMode(!addMode)}>
                                    <AltRouteIcon sx={{fontSize: 50, color: "#00f923"}}/>
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </>
                )
            })}
            {!addMode && routesToCompare.length === 2 &&
                <Paper sx={sxStylePaper}>
                    <Box sx={{display: "flex", flexWrap: "noWrap", gap: "1rem", m: "0 auto"}}>
                        {!addMode && routesToCompare.length === 2 && routesToCompare.map((route) => {
                            return (
                                /* <Box sx={{display: "flex", flexWrap: "noWrap", gap: "1rem", m: "0 auto"}}>*/
                                <NewRouteCard key={route.id} route={route}/>
                                /*   </Box>*/
                            )
                        })}
                    </Box>
                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between", gap: "9rem"}}>
                        <Button variant="text" color="error" onClick={onCancelClick}>
                            <DeleteIcon/>
                        </Button>
                        <Button variant="text" onClick={handleAddComparison}>
                            <CheckIcon sx={{fontSize: 60, color: "#00f923"}}/>
                        </Button>
                    </ButtonGroup>
                </Paper>}
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
        </Box>
    )
}
