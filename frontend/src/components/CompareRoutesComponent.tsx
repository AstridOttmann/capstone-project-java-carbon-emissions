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
            {props.comparedRoutes.compared.map((route) => {
                    return <CompareRoutesCard key={route.id} route={route}/>
                })}
            <Box sx={{display: "flex", gap: "1rem",}}>
                {props.comparedRoutes.compared.length === 2 && props.comparedRoutes.compared.map((route) => {
                    return (
                        <Box key={route.id} sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: 1,
                            width: "50%",
                            backgroundColor: "#3fd44d"
                        }}>
                            <Typography sx={{textAlign: "center"}}>{route.vehicle.type}</Typography>
                            <Typography sx={{textAlign: "center"}}>{route.co2EmissionRoute}</Typography>
                        </Box>
                    )
                })}
            </Box>
            <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.comparedRoutes.comparisonResults.difference}
                </Typography>
            </Box>
        </Paper>
    )
}