import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import React from "react";
import {User} from "../../models/MongoUserModel";
import {ComparisonResults} from "../../models/ComparisonResultsModel";
import {useNavigate} from "react-router-dom";
import RouteVehicleIcon from "../routes/RouteVehicleIcon";

const sxStyleBox = {
    display: "flex",
    justifyContent: "space-evenly",
    maxWidth: "100%",
    gap: "1rem",
    m: "0.5rem auto"
}
const sxStyleBox1 = {
    display: "flex",
    borderRadius: 1,
    width: "48%",
    p: "0.3rem",
    backgroundColor: "#00f923",
    color: "#fff",
}
const sxStyleBox2 = {
    display: "flex",
    borderRadius: 1,
    width: "48%",
    p: "0.3rem",
    backgroundColor: "#ff0000",
    color: "#fff",
}

type CompareRoutesResultsProps = {
    user: User,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
    updateScore: (id: string, bonus: number) => void
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    const navigate = useNavigate();

    const resultOne: number = props.compareRoutes.comparisonResults.resultRouteOne;
    const resultTwo: number = props.compareRoutes.comparisonResults.resultRouteTwo;

    function handleSelectOption(bonus: number) {
        props.updateScore(props.user.id, bonus);

        const timestamp = new Date().toLocaleString("en-EN");
        const date = timestamp.split(",")[0].trim();

        const newUsage = {
            datetime: date,
            bonus: bonus
        };

        const updatedComparisonResults: ComparisonResults =
            {
                ...props.compareRoutes.comparisonResults,
                usages: [newUsage, ...props.compareRoutes.comparisonResults.usages]
            };

        const updatedComparison: CompareRoutes =
            {...props.compareRoutes, comparisonResults: updatedComparisonResults};

        props.updateComparison(updatedComparison.id, updatedComparison);
        props.getAllComparisonByUserId(props.user.id);
        navigate("/account");
    }

    return (
        <>
            <Box sx={sxStyleBox}>
                <Button sx={resultOne > resultTwo ? sxStyleBox2 : sxStyleBox1}
                        onClick={() => handleSelectOption(resultOne)}>
                    <RouteVehicleIcon route={props.compareRoutes.compared[0]}/>
                    <Typography sx={{textAlign: "center", fontSize: "1.2rem"}}>
                        {resultOne} kg/pP
                    </Typography>
                </Button>
                <Button sx={resultTwo > resultOne ? sxStyleBox2 : sxStyleBox1}
                        onClick={() => handleSelectOption(resultTwo)}>
                    <RouteVehicleIcon route={props.compareRoutes.compared[1]}/>
                    <Typography sx={{textAlign: "center", fontSize: "1.2rem"}}>
                        {resultTwo} kg/pP
                    </Typography>
                </Button>
            </Box>
        </>
    )
}