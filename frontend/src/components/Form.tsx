import {
    Box,
    Button,
    FormControl,
    FormControlLabel, Input, InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import './Form.css'
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Route} from "../models/RouteModel";
import {Vehicle} from "../models/VehicleModel";
import {useNavigate} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import {RoutesContext} from "../contexts/RoutesContextProvider";
import {RouteContext} from "../contexts/RouteContextProvider";
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RouteIcon from '@mui/icons-material/Route';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import {toast} from "react-toastify";
import {User} from "../models/MongoUserModel";


const sxStylePaper = {
    m: "1rem",
    p: "1rem",
    pb: "2rem",
    textAlign: "center",
    elevation: "3",

}

const sxStyleBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "3rem",
    pb: "1.2rem",

}

const sxStyleTextField = {
    mt: "0.5rem"
}

type FormProps = {
    user: User,
    isEditMode: boolean,
    setAddMode: (arg0: boolean) => void,
    setIsEditMode: (arg0: boolean) => void,
    routesToCompare: Route[]
    setRoutesToCompare: React.Dispatch<React.SetStateAction<Route[]>>,
    getAllComparisonByUserId: (userId: string) => void,

}
export default function Form(props: FormProps) {
    const {route, setRoute, resetRoute} = useContext(RouteContext)
    const {addRoute, updateRoute} = useContext(RoutesContext)

    const initialStateVehicle = route && props.isEditMode ? route?.vehicle : {
        type: "",
        co2Emission: 0,
        fuel: "",
        carSize: "",
        distanceLevel: "",
        meansOfTransport: "",
    }
    const [vehicle, setVehicle] = useState<Vehicle>(initialStateVehicle)
    const navigate = useNavigate();

    const handleChangeSelectVehicle = (event: SelectChangeEvent<string>) => {
        const {name, value} = event.target
        setVehicle({
            ...vehicle, [name]: value
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        route && setRoute({...route, [name]: value})
    }

    const handleSuccessfulSubmit = () => {
        resetRoute();
        setVehicle(initialStateVehicle)
        props.setAddMode(false)
        props.setIsEditMode(false)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (route) {
            if (props.isEditMode) {
                const updatedRoute: Route = {...route, vehicle}
                updateRoute(updatedRoute.id, updatedRoute)
                    .then(() => {
                        props.getAllComparisonByUserId(props.user.id);
                        navigate(-1)
                        handleSuccessfulSubmit();
                    })

            } else {
                console.log(props.user);
                const routeToAdd = {...route, vehicle, userId: props.user.id}
                addRoute(routeToAdd)
                    .then(savedRoute => {
                        props.setRoutesToCompare(
                            [...props.routesToCompare, savedRoute])
                        handleSuccessfulSubmit()
                    })
                    .catch(error => {
                        console.error(error)
                        toast.error("Invalid Input! " + error)
                    })
            }
        }
    }

    function handleClick() {
        navigate(-1)
        resetRoute();
        setVehicle(initialStateVehicle);
        props.setIsEditMode(false)
    }

    function handleClose() {
        props.setIsEditMode(false)
        props.setAddMode(false)
    }

    return (
        <Paper sx={sxStylePaper}>
            <Box sx={sxStyleBox}>
                {props.isEditMode
                    ? <Typography variant="h6" component="h2" sx={{textDecoration: "underline"}} gutterBottom>Edit Route</Typography>
                    : <Typography variant="h6" component="h2" sx={{textDecoration: "underline"}}>Add Route</Typography>
                }
                <Button variant="text"
                        size="small"
                        color="error"
                        onClick={props.isEditMode ? handleClick : handleClose}>
                    <CloseIcon/></Button>
            </Box>

            {/*  {props.isEditMode
                ? <Box sx={sxStyleBox}>
                    <Typography variant="h2" sx={{fontSize: "2rem"}}>Edit Route</Typography>
                    <Button variant="text"
                            sx={{maxHeight: "2.5rem"}}
                            endIcon={<EditOffIcon/>}
                            onClick={handleClick}>
                        Cancel</Button>
                </Box>
                : <Box sx={sxStyleBox}><Typography variant="h2" sx={{fontSize: "2rem"}}>Add Route</Typography>
                    <Button variant="outlined"
                            sx={{maxHeight: "2.5rem"}}
                            onClick={handleClose}>
                        <CloseIcon/></Button></Box>
            }*/}
            {route &&
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        required
                        multiline
                        size="small"
                        type="text"
                        label="Start"
                        id="start"
                        name="start"
                        value={route.start}
                        onChange={handleChange}
                        sx={sxStyleTextField}/>
                    <TextField required
                               multiline
                               size="small"
                               type="text"
                               label="Destination"
                               id="destination"
                               name="destination"
                               value={route.destination}
                               onChange={handleChange}
                               sx={sxStyleTextField}/>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "2rem", m: "1.5rem 1rem 0.2rem 1rem"}}>
                        <FormControl sx={{width: "45%"}}>
                            <Input required
                                   size="small"
                                   type="number"
                                   id="distance"
                                   name="distance"
                                   value={route.distance}
                                   onChange={handleChange}
                                   endAdornment={<InputAdornment position="end">km</InputAdornment>}
                                   inputProps={{
                                       'aria-label': 'distance',
                                   }}
                                   sx={sxStyleTextField}/>
                        </FormControl>
                        <FormControl sx={{width: "45%"}}>
                            <Input required
                                   size="small"
                                   type="number"
                                   id="numberOfPersons"
                                   name="numberOfPersons"
                                   value={route.numberOfPersons}
                                   onChange={handleChange}
                                   endAdornment={<InputAdornment
                                       position="end"><PeopleAltOutlinedIcon/></InputAdornment>}
                                   sx={sxStyleTextField}/>
                        </FormControl>
                    </Box>
                    <FormControl sx={{m: "0.2rem 1rem 1.5rem 1rem"}}>
                        <RadioGroup
                            sx={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}
                            id="oneWay"
                            name="oneWay"
                            value={route.oneWay}
                            onChange={handleChange}
                        >
                            <FormControlLabel  value={true} control={<Radio/>} label={<RouteIcon sx={{pl: "0.5rem", fontSize: 35}}/>}/>
                            <FormControlLabel value={false} control={<Radio/>} label={<RotateRightIcon sx={{pl: "0.5rem", fontSize: 38}}/>}/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{mt: "0.5rem", mb: "0.5rem"}}>
                        <InputLabel id="type-label">Vehicle</InputLabel>
                        <Select

                            labelId="type-label"
                            id="type"
                            label="Vehicle"
                            name="type"
                            value={vehicle.type}
                            onChange={handleChangeSelectVehicle}>
                            <MenuItem value="car">Car</MenuItem>
                            <MenuItem value="publicTransport">Public Transport</MenuItem>
                            <MenuItem value="bike">Bike</MenuItem>
                            <MenuItem value="flight">Flight</MenuItem>
                        </Select>
                    </FormControl>
                    {vehicle.type === "car" &&
                        <>
                            <FormControl sx={{mt: "0.5rem"}}>
                                <InputLabel id="fuel-label">Fuel</InputLabel>
                                <Select
                                    size="small"
                                    labelId="fuel-label"
                                    id="fuel"
                                    label="Fuel"
                                    name="fuel"
                                    value={vehicle.fuel}
                                    onChange={handleChangeSelectVehicle}>
                                    <MenuItem value="petrol">petrol</MenuItem>
                                    <MenuItem value="diesel">diesel</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{mt: "0.5rem"}}>
                                <InputLabel id="carSize-label">Car Size</InputLabel>
                                <Select
                                    size="small"
                                    labelId="carSize-label"
                                    id="carSize"
                                    label="Car Size"
                                    name="carSize"
                                    value={vehicle.carSize}
                                    onChange={handleChangeSelectVehicle}>
                                    <MenuItem value="small">small</MenuItem>
                                    <MenuItem value="medium">medium</MenuItem>
                                    <MenuItem value="large">large</MenuItem>
                                </Select>
                            </FormControl>
                        </>}
                    {vehicle.type === "publicTransport" &&
                        <>
                            <FormControl sx={{mt: "0.5rem"}}>
                                <InputLabel id="distanceLevel-label">Distance Level</InputLabel>
                                <Select
                                    size="small"
                                    labelId="distanceLevel-label"
                                    id="distanceLevel"
                                    label="Distance Level"
                                    value={vehicle.distanceLevel}
                                    name="distanceLevel"
                                    onChange={handleChangeSelectVehicle}>
                                    <MenuItem value="local">local</MenuItem>
                                    <MenuItem value="long distance">long distance</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{mt: "0.5rem"}}>
                                <InputLabel id="meansOfTransport-label">Means of Transport</InputLabel>
                                <Select
                                    size="small"
                                    labelId="meansOfTransport-label"
                                    id="meansOfTransport"
                                    label="Means of Transport"
                                    value={vehicle.meansOfTransport}
                                    name="meansOfTransport"
                                    onChange={handleChangeSelectVehicle}>
                                    <MenuItem value="train">train</MenuItem>
                                    <MenuItem value="bus">bus</MenuItem>
                                </Select>
                            </FormControl>
                        </>}
                    <Button type="submit" variant="text" sx={{width: "fit-content", alignSelf: "self-end", mt: "0.5rem"}}>
                        <CheckIcon sx={{fontSize: 40}}/>
                    </Button>
                </form>}
        </Paper>
    )
}
