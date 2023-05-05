import {Box, Paper, Typography} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../models/CompareRoutesModel";

const sxStylePaper = {
    p: "1rem",
    pb: "2rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

type CompareRoutesComponentProps = {
    comparedRoutes: CompareRoutes,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    return (
        <Paper sx={sxStylePaper}>
            <CompareRoutesCard route={props.comparedRoutes.compared[0]}/>
            <CompareRoutesCard route={props.comparedRoutes.compared[1]}/>
            {/*    <Box sx={{display: "flex", gap: "1rem",}}>*/}
            <Box sx={{
                display: "flex",
                gap: "1rem",
                borderRadius: 1
            }}>
                <Box sx={{backgroundColor: "#3fd44d", width: "50%", borderRadius: 1,}}>
                    <Typography sx={{textAlign: "center"}}>{props.comparedRoutes.compared[0].vehicle.type}</Typography>
                    <Typography
                        sx={{textAlign: "center"}}>{props.comparedRoutes.compared[0].co2EmissionRoute}</Typography>
                </Box>
                <Box sx={{backgroundColor: "#3fd44d", width: "50%", borderRadius: 1,}}>
                    <Typography sx={{textAlign: "center"}}>{props.comparedRoutes.compared[1].vehicle.type}</Typography>
                    <Typography
                        sx={{textAlign: "center"}}>{props.comparedRoutes.compared[1].co2EmissionRoute}</Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.comparedRoutes.comparisonResults.difference} kg
                </Typography>
            </Box>
        </Paper>
    )
}