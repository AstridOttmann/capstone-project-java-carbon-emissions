import {Stack, styled, Typography} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import {Route} from "../models/RouteModel";

const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    border: "1",
    borderColor: "#3fd44d",
    padding: "1rem",
    borderRadius: 4,
    marginBottom: "0.5rem",
}));

type RouteVehicleDetailsProps = {
    route: Route
}
export default function RouteVehicleDetails(props: RouteVehicleDetailsProps) {
    return (
        <>
            <Typography variant="overline">Vehicle</Typography>
            <div>
                {props.route.vehicle.type === "car" && <DirectionsCarIcon/>}
                {props.route.vehicle.type === "publicTransport" && <TrainIcon/>}
                {props.route.vehicle.type === "flight" && <FlightIcon/>}
                {props.route.vehicle.type === "bike" && <DirectionsBikeIcon/>}
            </div>
            {props.route.vehicle.type === "flight" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "bike" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "car" &&
                <Stack direction="row" gap="0.5rem">
                    <Item><small>FUEL: </small> {props.route.vehicle.fuel}</Item>
                    <Item><small>CAR SIZE: </small> {props.route.vehicle.carSize}</Item>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "publicTransport" &&
                <Stack direction="row" gap="0.5rem">
                    <Item><small>DISTANCE LEVEL:</small> <br/>{props.route.vehicle.distanceLevel}</Item>
                    <Item><small>MEANS OF TRANSPORT: </small> <br/>{props.route.vehicle.meansOfTransport}</Item>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
        </>

    )
}