import {Button, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import React, {useState} from "react";
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
    getAllComparison: () => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void
}
export default function CompareRoutesResults(props: CompareRoutesResultsProps) {
    const navigate = useNavigate();
    const [comparisonResults, setComparisonResults] = useState<ComparisonResults>({
        resultRouteOne: 0,
        resultRouteTwo: 0,
        difference: 0
    })

    const resultOne: number = props.compareRoutes.comparisonResults.resultRouteOne;
    const resultTwo: number = props.compareRoutes.comparisonResults.resultRouteTwo;

    async function handleSelectOption(result: number) {
        const newScore = props.user.co2Score + result;
        props.setUser({...props.user, co2Score: newScore})

        const updatedComparisonResults: ComparisonResults =
            {...comparisonResults, difference: newScore};
        const updatedComparison: CompareRoutes =
            {...props.compareRoutes, comparisonResults: updatedComparisonResults};

        await props.updateComparison(updatedComparison.id, updatedComparison);
        await props.getAllComparison();
        navigate("/account");
    }

    console.log("comparison", props.compareRoutes)
    return (
        <>
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
        </>
    )
}