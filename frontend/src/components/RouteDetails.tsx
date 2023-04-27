import {Button, ButtonGroup, Card, Divider, Paper, Stack, styled, Typography} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import EditIcon from "@mui/icons-material/Edit";
import {Route} from "../models/RouteModel";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

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
    initialStateRoute: Route,
    route: Route,
    setRoute: (route: Route) => void,
    getRouteById: (id: string) => void,
    setIsEditMode: (arg0: boolean)=> void
}
export default function RouteDetails(props: RouteDetailsProps) {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.getRouteById(id)
        }
        //eslint-disable-next-line
    }, [id])

    function handleClickBack() {
        navigate(-1)
        props.setRoute(props.initialStateRoute);
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
            <Card sx={sxStyleCard} variant="outlined">
                <Typography variant="overline">Route</Typography>
                <p>Id: {props.route.id}</p>
                <Stack>
                    <Item>From: {props.route.start}</Item>
                    <Item>To: {props.route.destination}</Item>
                    <Item>Distance: {props.route.distance} km</Item>
                    <Item>Number of persons: {props.route.numberOfPersons}</Item>
                    <Item>{props.route.oneWay ? "oneWay" : "Round Trip"}</Item>
                </Stack>
                <Divider sx={{borderColor: "#808080"}}/>

                <Typography variant="overline">Vehicle</Typography>
                <div>
                    {props.route.vehicle.type === "car" && <DirectionsCarIcon/>}
                    {props.route.vehicle.type === "publicTransport" && <TrainIcon/>}
                    {props.route.vehicle.type === "flight" && <FlightIcon/>}
                    {props.route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
                </div>
                {props.route.vehicle.type === "car" &&
                    <Stack direction="row" gap="0.5rem">
                        <Item>Fuel: {props.route.vehicle.fuel}</Item>
                        <Item>Car size: {props.route.vehicle.carSize}</Item>
                    </Stack>}
                {props.route.vehicle.type === "publicTransport" &&
                    <Stack direction="row" gap="0.5rem">
                        <Item>Distance Level: <br/>{props.route.vehicle.distanceLevel}</Item>
                        <Item>Means of Transport: <br/>{props.route.vehicle.meansOfTransport}</Item>
                    </Stack>}
                <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                             variant="text"
                             aria-label="text button group">
                    <Button variant="outlined"
                            onClick={handleClickBack}>Back</Button>
                    <Button className="button" variant="contained" endIcon={<EditIcon/>}
                            onClick={handleClickEdit}>Edit</Button>
                </ButtonGroup>
            </Card>
        </Paper>
    )
}