import {Card, CardContent, Paper, Typography} from "@mui/material";
import React from "react";
import ForestIcon from '@mui/icons-material/Forest';

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
    width: "20%",
    pb: "0",
    m: "1rem"
}
export default function UserAccount() {
    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" sx={sxStyleTitle}>My CO2-Bonus-Score</Typography>
            <Card sx={sxStyleCard}>
                <CardContent sx={{display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center"}}>
                    <ForestIcon fontSize="large"/>
                    <Typography variant="h5" component="h2" sx={{textAlign: "center"}}>
                        33
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    )
}