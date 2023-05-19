import {Button, Card, CardContent, Paper, Typography} from "@mui/material";
import React from "react";
import ForestIcon from '@mui/icons-material/Forest';
import {User} from "../models/MongoUserModel";

const sxStylePaper = {
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
    setUser: (user: User) => void,
    updateScore: (id: string, user: User) => void,
    resetAllUsages: (userId: string)=> void
}
export default function UserAccount(props: UserAccountProps) {
    function resetScore(){
        const updatedUser =
            {...props.user, co2Score: 0};
        props.setUser(updatedUser);
        props.updateScore(updatedUser.id, updatedUser)
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
            <Button variant="outlined" onClick={resetScore}>Reset Score</Button>
        </Paper>
    )
}