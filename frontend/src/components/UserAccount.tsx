import {Box, Button, Card, CardContent, Container, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import ForestIcon from '@mui/icons-material/Forest';
import {User} from "../models/MongoUserModel";
import ResetDialog from "./ResetDialog";

const sxStylePaper = {
    position: "relative",
    top: "7rem",
    p: "1rem",
    pb: "4rem",
    elevation: 3
}

const sxStyleContainer = {
    position: "relative",
    top: "5rem",
    p: "1rem",
    pb: "3rem",
}

const sxStyleTitle = {
    p: "1rem 1rem 2rem 1rem",
}
const sxStyleCard = {
    m: "1rem"
}
type UserAccountProps = {
    user: User,
    resetAllUsages: (userId: string) => void,
    resetScore: (userId: string) => void
}
export default function UserAccount(props: UserAccountProps) {
    const [open, setOpen] = useState(false);
    const dialogContent: string = "Resetting the score is final and cannot be reversed. All usages will be resetted, too. Do you want to continue?";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleReset() {
        props.resetScore(props.user.id)
        props.resetAllUsages(props.user.id)
        setOpen(false);
    }

    return (
        <Container maxWidth="md" sx={sxStyleContainer}>
            {/*   <Paper sx={sxStylePaper}>*/}
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>My Co2-Bonus-Score</Typography>
            <Card sx={sxStyleCard}>
                <CardContent>
                    <Typography>Co2 emission saved</Typography>
                    <Box sx={{display: "flex", gap: "1rem", justifyContent: "space-evenly", alignItems: "center"}}>
                        <ForestIcon color={"primary"} fontSize="large" sx={{fontSize: 60}}/>
                        <Typography color={props.user.co2Score < 0 ? "primary" : "error"}
                                    sx={{fontSize: "1.5rem"}}>{props.user.co2Score.toFixed(2)} kg</Typography>
                    </Box>
                </CardContent>
            </Card>
            <Button variant="text" color="error" onClick={handleClickOpen}>Reset Score</Button>
            <ResetDialog open={open}
                         handleClose={handleClose}
                         onReset={handleReset}
                         buttonAgreeText={"Yes, reset!"}
                         buttonDisagreeText={"Don't reset."}
                         dialogContent={dialogContent}
            />
        </Container>
    )
}