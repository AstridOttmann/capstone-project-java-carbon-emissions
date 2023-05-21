import {Button, Card, CardContent, Paper, Typography} from "@mui/material";
import React from "react";
import ForestIcon from '@mui/icons-material/Forest';
import {User} from "../models/MongoUserModel";

const sxStylePaper = {
    position: "relative",
    top: "5rem",
    p: "1rem",
    pb: "4rem",
    backgroundColor: "#282c34",
    elevation: "3"
}
const sxStyleTitle = {
    fontSize: "2rem",
    color: "#3fd44d"
}
const sxStyleCard = {
    color: "#3fd44d",
    width: "fit-content",
    m: "1rem"
}
type UserAccountProps = {
    user: User,
    resetAllUsages: (userId: string) => void,
    resetScore: (userId: string) => void
}
export default function UserAccount(props: UserAccountProps) {
    function resetScore() {
        props.resetScore(props.user.id)
        props.resetAllUsages(props.user.id)
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" sx={sxStyleTitle}>My CO2-Bonus-Score</Typography>
            <Card sx={sxStyleCard}>
                <CardContent sx={{display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center"}}>
                    <ForestIcon fontSize="large"/>
                    <Typography>{props.user.co2Score.toFixed(2)} kg/CO2</Typography>
                </CardContent>
            </Card>
            <Button variant="outlined" color="error" onClick={resetScore}>Reset Score</Button>
        </Paper>
    )
}