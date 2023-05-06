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
                    <Item>CO2-Emission in g/km: {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "bike" &&
                <Stack>
                    <Item>CO2-Emission in g/km: {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "car" &&
                <Stack direction="row" gap="0.5rem">
                    <Item>Fuel: {props.route.vehicle.fuel}</Item>
                    <Item>Car size: {props.route.vehicle.carSize}</Item>
                    <Item>CO2-Emission in g/km: {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "publicTransport" &&
                <Stack direction="row" gap="0.5rem">
                    <Item>Distance Level: <br/>{props.route.vehicle.distanceLevel}</Item>
                    <Item>Means of Transport: <br/>{props.route.vehicle.meansOfTransport}</Item>
                    <Item>CO2-Emission in g/km: {props.route.vehicle.co2Emission}</Item>
                </Stack>}
        </>

    )
}