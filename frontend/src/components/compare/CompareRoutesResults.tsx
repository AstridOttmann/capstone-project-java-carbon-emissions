import {
    Button,
    Typography
} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import React from "react";
import {User} from "../../models/MongoUserModel";
import {ComparisonResults} from "../../models/ComparisonResultsModel";
import {useNavigate} from "react-router-dom";

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
    user: User,
    setUser: (user: User) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    getAllComparisonByUserId: (userId: string) => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
    updateScore: (id: string, user: User) => void
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    const navigate = useNavigate();

    const resultOne: number = props.compareRoutes.comparisonResults.resultRouteOne;
    const resultTwo: number = props.compareRoutes.comparisonResults.resultRouteTwo;

    function handleSelectOption(result: number) {
        // updateUserScore
        const newScore = props.user.co2Score + result;
        const updatedUser =
            {...props.user, co2Score: newScore};

        props.updateScore(updatedUser.id, updatedUser);
        console.log("userUP", updatedUser)

        // updateComparison - usage
        const newUsage = {
            datetime: new Date().toLocaleString("en-EN"),
            bonus: result
        };

        const updatedComparisonResults: ComparisonResults =
            {
                ...props.compareRoutes.comparisonResults,
                usages: [...props.compareRoutes.comparisonResults.usages, newUsage]
            };

        const updatedComparison: CompareRoutes =
            {...props.compareRoutes, comparisonResults: updatedComparisonResults};

        props.updateComparison(updatedComparison.id, updatedComparison);
        props.getAllComparisonByUserId(props.user.id);
        navigate("/account");
    }

    return (
        <>
            {/*  <Box sx={{display: "flex", width: "100vw", gap: "1rem"}}>*/}
            <Button sx={resultOne > resultTwo ? sxStyleBox2 : sxStyleBox1}
                    onClick={() => handleSelectOption(resultOne)}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[0].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{resultOne}</Typography>

            </Button>
            <Button sx={resultTwo > resultOne ? sxStyleBox2 : sxStyleBox1}
                    onClick={() => handleSelectOption(resultTwo)}>
                <Typography sx={{textAlign: "center"}}>{props.compareRoutes.compared[1].vehicle.type}</Typography>
                <Typography
                    sx={{textAlign: "center"}}>{resultTwo}</Typography>
            </Button>
            {/*  </Box>*/}
        </>
    )
}