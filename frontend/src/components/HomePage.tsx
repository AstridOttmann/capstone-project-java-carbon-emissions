import Form from "./Form";
import {Button, ButtonGroup, Paper} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {useState} from "react";
import {Route} from "../models/RouteModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CompareRoutesComponent from "./CompareRoutesComponent";

type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)
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

            {!addMode && routesToCompare.length === 1 &&
                <>
                    <CompareRoutesComponent routesToCompare={routesToCompare}/>
                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}>
                        <Button variant="outlined" endIcon={<SaveIcon/>}>
                            Save Route
                        </Button>
                        <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}>
                            Delete Route
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup sx={{display: "flex", justifyContent: "center"}}>
                        <Button variant="outlined"
                                onClick={() => setAddMode(!addMode)}><AltRouteIcon/>
                            Add Route & Compare
                        </Button>
                    </ButtonGroup>
                </>}
            {!addMode && routesToCompare.length === 2 &&
                <>
                    <CompareRoutesComponent routesToCompare={routesToCompare}/>
                    <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}>
                        <Button variant="outlined" endIcon={<SaveIcon/>}>
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
                /> : null
            }
        </Paper>
    )
}