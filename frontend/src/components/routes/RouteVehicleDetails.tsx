import {Box, Stack, styled} from "@mui/material";
import {Route} from "../../models/RouteModel";

const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    width: "40%",
    padding: "1rem",
    borderRadius: 5,
}));

type RouteVehicleDetailsProps = {
    route: Route
}
export default function RouteVehicleDetails(props: RouteVehicleDetailsProps) {
    return (
        <Box>
            {props.route.vehicle.type === "flight" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "bike" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "car" &&
                <Stack direction="row" flexWrap="wrap" gap="1rem">
                    <Item><small>FUEL: </small> {props.route.vehicle.fuel}</Item>
                    <Item><small>CAR SIZE: </small> {props.route.vehicle.carSize}</Item>
                    <Item sx={{width: "85%", fontWeight: "bold"}}><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
            {props.route.vehicle.type === "publicTransport" &&
                <Stack direction="row" flexWrap="wrap" gap="0.5rem">
                    <Item><small>DISTANCE LEVEL:</small> <br/>{props.route.vehicle.distanceLevel}</Item>
                    <Item><small>MEANS OF TRANSPORT: </small> <br/>{props.route.vehicle.meansOfTransport}</Item>
                    <Item sx={{width: "85%", fontWeight: "bold"}}><small>CO2-EMISSION in g/km: </small> {props.route.vehicle.co2Emission}</Item>
                </Stack>}
        </Box>

    )
}