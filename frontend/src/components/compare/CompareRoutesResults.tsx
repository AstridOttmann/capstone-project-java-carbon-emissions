import {Button, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";

const sxStyleBox1 = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 1,
    width: "50%",
    backgroundColor: "#3fd44d"
}

const sxStyleBox2 = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 1,
    width: "50%",
    backgroundColor: "#c93c20",
    color: "white"
}

type CompareRoutesResultsProps = {
    compareRoutes: CompareRoutes
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    console.log("comparison", props.compareRoutes)
    const resultOne: number = props.compareRoutes.comparisonResults.resultRouteOne;
    const resultTwo: number = props.compareRoutes.comparisonResults.resultRouteTwo;

    return (
        <>
            <Button sx={resultOne > resultTwo ? sxStyleBox2 : sxStyleBox1}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[0].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{resultOne}</Typography>
            </Button>
            <Button sx={resultTwo > resultOne ? sxStyleBox2 : sxStyleBox1}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[1].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{resultTwo}</Typography>
            </Button>
        </>
    )
}