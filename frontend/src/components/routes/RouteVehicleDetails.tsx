import {Box, Stack, styled, Typography} from "@mui/material";
import {Route} from "../../models/RouteModel";

const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    width: "100%",
    padding: "1rem",
    borderRadius: 10,
}));

type RouteVehicleDetailsProps = {
    route: Route
}
export default function RouteVehicleDetails(props: RouteVehicleDetailsProps) {
    return (
        <Box>
            {props.route.vehicle.type === "flight" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small>
                        {props.route.vehicle.co2Emission}
                    </Item>
                </Stack>}
            {props.route.vehicle.type === "bike" &&
                <Stack>
                    <Item><small>CO2-EMISSION in g/km: </small>
                        {props.route.vehicle.co2Emission}
                    </Item>
                </Stack>}
            {props.route.vehicle.type === "car" &&
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <Stack direction="column" gap="1rem" width="50%">
                        <Item><small>FUEL: </small>
                            {props.route.vehicle.fuel}
                        </Item>
                        <Item><small>CAR SIZE: </small>
                            {props.route.vehicle.carSize}
                        </Item>
                    </Stack>
                    <Stack>
                        <Item sx={{height: "100%", fontWeight: "bold"}}><small>CO2-EMISSION in g/km: </small>
                            <Typography sx={{
                                fontSize: "1.2rem",
                                pt: "1rem"
                            }}>
                                {props.route.vehicle.co2Emission}
                            </Typography>
                        </Item>
                    </Stack>
                </Box>}
            {props.route.vehicle.type === "publicTransport" &&
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <Stack direction="column" gap="1rem" width="50%">
                        <Item><small>DISTANCE LEVEL:</small> <br/>
                            {props.route.vehicle.distanceLevel}
                        </Item>
                        <Item><small>MEANS OF TRANSPORT: </small>
                            <br/>{props.route.vehicle.meansOfTransport}
                        </Item>
                    </Stack>
                    <Stack>
                        <Item sx={{height: "100%", fontWeight: "bold"}}><small>CO2-EMISSION in g/km:</small>
                            <Typography sx={{
                                fontSize: "1.2rem",
                                pt: "1rem"
                            }}>{props.route.vehicle.co2Emission}</Typography>
                        </Item>
                    </Stack>
                </Box>}
        </Box>

    )
}