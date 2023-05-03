import {Button, ButtonGroup, Card, Divider, Paper, Stack, styled, Typography} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import EditIcon from "@mui/icons-material/Edit";
import {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RouteContext} from "../contexts/RouteContextProvider";

const sxStylePaper = {
    p: "1rem",
    pb: "3rem",
    backgroundColor: "#282c34",
    elevation: "3"
}
const sxStyleCard = {
    p: "1rem",
    mb: "2rem",
    border: "1",
    borderColor: "#3fd44d"
}
const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d"
}
const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    border: "1",
    borderColor: "#3fd44d",
    padding: "1rem",
    borderRadius: 4,
    marginBottom: "0.5rem",
}));

type RouteDetailsProps = {
    setIsEditMode: (arg0: boolean) => void
}
export default function RouteDetails(props: RouteDetailsProps) {
    const {route, resetRoute, getRouteById} = useContext(RouteContext);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getRouteById(id)
        }
        //eslint-disable-next-line
    }, [id])

    function handleClickBack() {
        navigate(-1)
        resetRoute()
    }

    function handleClickEdit() {
        navigate("/")
        props.setIsEditMode(true);
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                Route Details
            </Typography>
            {route ? (
                    <Card sx={sxStyleCard} variant="outlined">
                        <Typography variant="overline">Route</Typography>
                        <p>Id: {route.id}</p>
                        <Stack>
                            <Item>From: {route.start}</Item>
                            <Item>To: {route.destination}</Item>
                            <Item>Distance: {route.distance} km</Item>
                            <Item>Number of persons: {route.numberOfPersons}</Item>
                            <Item>{route.oneWay ? "oneWay" : "Round Trip"}</Item>
                        </Stack>
                        <Divider sx={{borderColor: "#808080"}}/>

                        <Typography variant="overline">Vehicle</Typography>
                        <div>
                            {route.vehicle.type === "car" && <DirectionsCarIcon/>}
                            {route.vehicle.type === "publicTransport" && <TrainIcon/>}
                            {route.vehicle.type === "flight" && <FlightIcon/>}
                            {route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
                        </div>
                        {route.vehicle.type === "flight" &&
                            <Stack>
                                <Item>CO2-Emission in g/km: {route.vehicle.co2Emission}</Item>
                            </Stack>}
                        {route.vehicle.type === "bike" &&
                            <Stack>
                                <Item>CO2-Emission in g/km: {route.vehicle.co2Emission}</Item>
                            </Stack>}
                        {route.vehicle.type === "car" &&
                            <Stack direction="row" gap="0.5rem">
                                <Item>Fuel: {route.vehicle.fuel}</Item>
                                <Item>Car size: {route.vehicle.carSize}</Item>
                                <Item>CO2-Emission in g/km: {route.vehicle.co2Emission}</Item>
                            </Stack>}
                        {route.vehicle.type === "publicTransport" &&
                            <Stack direction="row" gap="0.5rem">
                                <Item>Distance Level: <br/>{route.vehicle.distanceLevel}</Item>
                                <Item>Means of Transport: <br/>{route.vehicle.meansOfTransport}</Item>
                                <Item>CO2-Emission in g/km: {route.vehicle.co2Emission}</Item>
                            </Stack>}
                        <Typography variant="overline">CO2-Emission </Typography>
                        <Stack>
                            <Item>pro Person in kg: {route.co2EmissionRoute}</Item>
                        </Stack>
                        <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                                     variant="text"
                                     aria-label="text button group">
                            <Button variant="outlined"
                                    onClick={handleClickBack}>Back</Button>
                            <Button variant="contained" endIcon={<EditIcon/>}
                                    onClick={handleClickEdit}>Edit</Button>
                        </ButtonGroup>
                    </Card>)
                : <div>Loading ...</div>}
        </Paper>
    )
}