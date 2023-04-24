import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import './Form.css'
import {ChangeEvent, FormEvent, useState} from "react";
import {Route} from "../models/RouteModel";

const sxStyle = {
    m: "1rem",
    p: "1rem",
    pb: "3rem",
    textAlign: "center"
}

export default function Form() {
    const initialState: Route = {
        co2EmissionRoute: 0,
        destination: "",
        distance: 0,
        id: "",
        numberOfPersons: 0,
        oneWay: false,
        start: "",
        vehicle:
            {type:"", co2Emission: 0, fuel:"",carSize:"", distanceLevel: "", meansOfTransport: ""}
    }
    const [formData, setFormData] = useState<Route>(initialState)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }
    return (
        <Paper sx={sxStyle}>
            <Typography variant="h2" sx={{fontSize: "2rem"}}>Add Route</Typography>
            <form className="form" onSubmit={onSubmit}>
                <TextField required
                           label="Start"
                           id="start"
                           value={formData.start}
                           onChange={handleChange}/>
                <TextField required
                           label="Destination"
                           id="destination"
                           value={formData.destination}
                           onChange={handleChange}/>
                <TextField required
                           label="Distance"
                           id="distance"
                           value={formData.distance}
                           onChange={handleChange}/>
                <TextField required
                           type="number"
                           label="Number of persons"
                           id="numberOfPersons"
                           value={formData.numberOfPersons}
                           onChange={handleChange}/>
                <RadioGroup sx={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    <FormControlLabel value="oneWay" control={<Radio/>} label="One Way"/>
                    <FormControlLabel value="roundTrip" control={<Radio/>} label="Round Trip"/>
                </RadioGroup>
                <FormControl>
                    <InputLabel id="vehicle-label">Vehicle</InputLabel>
                    <Select
                        labelId="vehicle-label"
                        id="vehicle"
                        label="Vehicle"
                        value={formData.vehicle.type}
                        /*onChange={handleChange}*/>
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="publicTransport">Public Transport</MenuItem>
                        <MenuItem value="bike">Bike</MenuItem>
                        <MenuItem value="flight">Flight</MenuItem>
                    </Select>
                </FormControl>
                <TextField required
                           label="fuel/distanceLevel"
                           id="fuel/distanceLevel"
                           value={formData.vehicle.fuel}
                           onChange={handleChange}/>
                <TextField required
                           label="carSize/meansOfTransport"
                           id="carSize/meansOfTransport"
                           value={formData.vehicle.carSize}
                           onChange={handleChange}/>
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </Paper>
    )
}