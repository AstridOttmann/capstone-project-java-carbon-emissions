import Form from "./Form";
import {Box, Button, ButtonGroup, Paper, Typography} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {useState} from "react";
import {Route} from "../models/RouteModel";
import RouteCard from "./RouteCard";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';

type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)
    // const [compareMode, setCompareMode] = useState<boolean>(false)
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([])

    return (
        <Paper sx={{
            pb: "4rem",
            pt: "1rem",
            backgroundColor: "#282c34"
        }}>
            {!addMode && routesToCompare.length === 0 &&
                <ButtonGroup
                    sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: "0.5rem", m: "1rem"}}
                    variant="text"
                    aria-label="text button group">
                    <Button variant="outlined"
                            onClick={() => setAddMode(!addMode)}><AddLocationIcon/>
                        Add Route
                    </Button>
                </ButtonGroup>}
            {!addMode && routesToCompare &&
                routesToCompare.map((route) => {
                    return <RouteCard key={route.id} route={route}/>
                })}
            {!addMode && routesToCompare.length === 1 &&
                <ButtonGroup>
                    <Button variant="outlined"
                            onClick={() => setAddMode(!addMode)}><AltRouteIcon/>
                        Add Route & Compare
                    </Button>
                    <Button variant="outlined" endIcon={<SaveIcon/>}>
                        Save
                    </Button>
                    <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}>
                        Delete
                    </Button>
                </ButtonGroup>}
            {routesToCompare.length === 2 && routesToCompare.map((route) => {
                    return <Box key={route.id} sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        gap: "2rem",
                        backgroundColor: "#3fd44d"
                    }}>
                        <Typography>{route.vehicle.type}</Typography>
                        <Typography>{route.co2EmissionRoute}</Typography>
                    </Box>
                })}
            {!addMode && routesToCompare.length === 2 &&
            <ButtonGroup>
                <Button variant="outlined" endIcon={<SaveIcon/>}>
                    Save
                </Button>
                <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            </ButtonGroup>}
            {addMode || props.isEditMode ?
                    <Form isEditMode={props.isEditMode}
                          setIsEditMode={props.setIsEditMode}
                          setAddMode={setAddMode}
                          setRoutesToCompare={setRoutesToCompare}
                          routesToCompare={routesToCompare}
                    /> : null
            }
        </Paper>
    )
}