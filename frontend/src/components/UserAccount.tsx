import {Box, Button, Card, Container, Typography} from "@mui/material";
import React, {useState} from "react";
import ForestIcon from '@mui/icons-material/Forest';
import {User} from "../models/MongoUserModel";
import ResetDialog from "./ResetDialog";
import Icon from '@mdi/react';
import {mdiFootPrint} from '@mdi/js';
import CircularProgressWithLabel from "./CircularProgressWithLabel";


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
    backgroundColor: "#B3BDB3",
    m: "1rem",
    borderRadius: "15px"
}
const sxStyleCardMiddle = {
    backgroundColor: "#B3BDB3",
    m: "1rem",
    borderRadius: "15px"
}
type UserAccountProps = {
    user: User,
    resetAllUsages: (userId: string) => void,
    resetScore: (userId: string) => void
}
export default function UserAccount(props: UserAccountProps) {
    const [open, setOpen] = useState(false);
    const dialogContent: string = "Resetting the score is final and cannot be reversed. All usages will be resetted, too. Do you want to continue?";

    // const userScoreAbsolute = Math.abs(props.user.co2Score);
    //const percentage: number = 100 - (userScoreAbsolute / 22);
    const percentage: number = Math.abs(-100 - (props.user.co2Score / 22));
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
        <Container maxWidth="sm" sx={sxStyleContainer}>
            {/*   <Paper sx={sxStylePaper}>*/}
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>My Co2-Bonus-Score</Typography>
            <Card sx={sxStyleCard}>
                <Typography variant="h6" sx={{p: "1rem"}}>Co2 emission saved</Typography>
                <Box sx={{display: "flex", gap: "1rem", justifyContent: "space-evenly", alignItems: "center"}}>
                    <ForestIcon color={"primary"} fontSize="large" sx={{fontSize: 60}}/>
                    <Typography color={props.user.co2Score < 0 ? "primary" : "error"}
                                sx={{fontSize: "1.5rem"}}>{props.user.co2Score.toFixed(2)} kg</Typography>
                </Box>
                <Button variant="text" color="error" onClick={handleClickOpen} sx={{pl: "2rem"}}>Reset Score</Button>
                <ResetDialog open={open}
                             handleClose={handleClose}
                             onReset={handleReset}
                             buttonAgreeText={"Yes, reset!"}
                             buttonDisagreeText={"Don't reset."}
                             dialogContent={dialogContent}
                />
            </Card>
            <Card sx={sxStyleCardMiddle}>
                <Typography variant="h6" sx={{p: "1rem", pb: 0}}>My Co2-footprint</Typography>
                <Box sx={{display: "flex"}}>
                    <Box sx={{p: "0.5rem", m: "1rem", borderRadius: "10px"}}>
                        <CircularProgressWithLabel size="5rem" value={percentage}/>
                    </Box>
                    <Box sx={{backgroundColor: "#008d0d", p: "0.5rem", m: "1rem", borderRadius: "10px"}}>
                        <Typography>of the 2.2 t caused by mobility</Typography>
                    </Box>
                </Box>

            </Card>
            <Card sx={sxStyleCard}>
                <Box sx={{backgroundColor: "#cd5300", m: "1rem", p: "1rem", borderRadius: "10px"}}>
                    <Typography gutterBottom>Average Co2 footprint per capita in Germany: 10.8 t/Co2-e pP</Typography>
                    <Typography color={"info.dark"}>2.2 t of this is attributable to mobility</Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "end"}}>
                    <Box>
                        <Typography>10.8 t</Typography>
                        <Icon path={mdiFootPrint} size={6}/>
                    </Box>
                    <Box>
                        <Typography color={"primary"}>2.2 t </Typography>
                        <Icon path={mdiFootPrint} size={3} color="#008d0d"/>
                    </Box>
                </Box>
            </Card>
        </Container>

    )
}