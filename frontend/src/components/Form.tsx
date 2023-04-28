import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
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
import {ChangeEvent, FormEvent, useState} from "react";
import {NewRoute, Route} from "../models/RouteModel";
import {Vehicle} from "../models/VehicleModel";
import {useNavigate} from "react-router-dom";
import EditOffIcon from '@mui/icons-material/EditOff';

const sxStyle = {
    m: "1rem",
    p: "1rem",
    pb: "3rem",
    textAlign: "center",
    elevation: "3"
}
type FormProps = {
    initialStateRoute: Route,
    route: Route,
    setRoute: (route: Route) => void,
    addRoute: (route: NewRoute) => void,
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
    updateRoute: (id: string, route: Route) => void
}
export default function Form(props: FormProps) {
    const initialStateVehicle = props.isEditMode ? props.route.vehicle : {
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
        props.setRoute({...props.route, [name]: value})
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (props.isEditMode) {
            const updatedRoute: Route = {...props.route, vehicle}
            props.updateRoute(updatedRoute.id, updatedRoute);
            navigate(-1);
        } else {
            const routeToAdd = {...props.route, vehicle}
            props.addRoute(routeToAdd)
        }
        props.setRoute(props.initialStateRoute)
        setVehicle(initialStateVehicle)
        props.setIsEditMode(false)
    }

    function handleClick(){
        navigate(-1)
        props.setRoute(props.initialStateRoute);
        setVehicle(initialStateVehicle);
        props.setIsEditMode(false)
    }

    return (
        <Paper sx={sxStyle}>

            {props.isEditMode
                ? <Box sx={{display:"flex", justifyContent: "space-between", p: "0.5rem", m: "0.5rem"}}>
                    <Typography variant="h2" sx={{fontSize: "2rem"}}>Edit Route</Typography>
                    <Button variant="contained" endIcon={<EditOffIcon/>} onClick={handleClick}>Cancel</Button>
                </Box>
                : <Typography variant="h2" sx={{fontSize: "2rem"}}>Add Route</Typography>}
            <form className="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    type="text"
                    label="Start"
                    id="start"
                    name="start"
                    value={props.route.start}
                    onChange={handleChange}/>
                <TextField required
                           type="text"
                           label="Destination"
                           id="destination"
                           name="destination"
                           value={props.route.destination}
                           onChange={handleChange}/>
                <TextField required
                           type="number"
                           label="Distance"
                           id="distance"
                           name="distance"
                           value={props.route.distance}
                           onChange={handleChange}/>
                <TextField required
                           type="number"
                           label="Number of persons"
                           id="numberOfPersons"
                           name="numberOfPersons"
                           value={props.route.numberOfPersons}
                           onChange={handleChange}/>
                <FormControl>
                    <RadioGroup
                        sx={{flexDirection: "row"}}
                        id="oneWay"
                        name="oneWay"
                        value={props.route.oneWay}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio/>} label="One Way"/>
                        <FormControlLabel value={false} control={<Radio/>} label="Round Trip"/>
                    </RadioGroup>
                </FormControl>
                <FormControl>
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
                        <FormControl>
                            <InputLabel id="fuel-label">Fuel</InputLabel>
                            <Select
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
                        <FormControl>
                            <InputLabel id="carSize-label">Car Size</InputLabel>
                            <Select
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
                        <FormControl>
                            <InputLabel id="distanceLevel-label">Distance Level</InputLabel>
                            <Select
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
                        <FormControl>
                            <InputLabel id="meansOfTransport-label">Means of Transport</InputLabel>
                            <Select
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
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </Paper>
    )
}