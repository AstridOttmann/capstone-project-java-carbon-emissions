import {Box, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";

const sxStyleBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 1,
    width: "50%",
    backgroundColor: "#3fd44d"
}
type CompareRoutesResultsProps = {
    compareRoutes: CompareRoutes
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    console.log("comparison", props.compareRoutes)

    return (
        <>
            <Box sx={sxStyleBox}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[0].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{props.compareRoutes.comparisonResults.resultRouteOne}</Typography>
            </Box>
            <Box sx={sxStyleBox}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[1].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{props.compareRoutes.comparisonResults.resultRouteTwo}</Typography>
            </Box>
        </>
    )
}