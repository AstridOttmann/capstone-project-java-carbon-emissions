import Form from "./Form";
import {Box, Button, ButtonGroup, Paper, Typography} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {useState} from "react";
import {Route} from "../models/RouteModel";
import RouteCard from "./RouteCard";

type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [compareMode, setCompareMode] = useState<boolean>(false)
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([])

    return (
        <Paper sx={{
            pb: "4rem",
            backgroundColor: "#282c34"
        }}>
            {routesToCompare.length && routesToCompare.map((route) => {
                return <RouteCard key={route.id} route={route}/>
            })}
            <Box sx={{display: "flex", justifyContent: "space-evenly", gap: "2rem", backgroundColor: "#3fd44d"}}>
            {routesToCompare.length > 1 && routesToCompare.map((route) => {
                return <Box key={route.id} >
                    <Typography>{route.vehicle.type}</Typography>
                    <Typography>{route.co2EmissionRoute}</Typography>
                </Box>
            })}
            </Box>
            {addMode || props.isEditMode ?
                <Form isEditMode={props.isEditMode}
                      setIsEditMode={props.setIsEditMode}
                      setAddMode={setAddMode}
                      setRoutesToCompare={setRoutesToCompare}
                      routesToCompare={routesToCompare}
                /> :
                <ButtonGroup sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}
                             variant="text"
                             aria-label="text button group">
                    <Button variant="outlined" sx={{m: "1rem"}} onClick={() => setAddMode(!addMode)}><AddLocationIcon/>
                        Add Route
                    </Button>
                    <Button variant="outlined" sx={{m: "1rem"}}
                            onClick={() => setCompareMode(!compareMode)}><AltRouteIcon/>
                        Compare
                    </Button></ButtonGroup>}
        </Paper>
    )
}