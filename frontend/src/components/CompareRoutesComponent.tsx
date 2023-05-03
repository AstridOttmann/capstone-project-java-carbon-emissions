
import {Box, Paper, Typography} from "@mui/material";
import {Route} from "../models/RouteModel";
import CompareRoutesCard from "./CompareRoutesCard";

const sxStylePaper = {
    p: "1rem",
    pb: "2rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

type CompareRoutesComponentProps = {
    routesToCompare: Route[]
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    return (
        <Paper sx={sxStylePaper}>
            {props.routesToCompare &&
                props.routesToCompare.map((route) => {
                    return <CompareRoutesCard key={route.id} route={route}/>
                })}
            <Box sx={{display: "flex", gap: "1rem",}}>
                {props.routesToCompare.length === 2 && props.routesToCompare.map((route) => {
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
        </Paper>
    )
}