import {Box, Button, ButtonGroup, Paper, Typography} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../models/CompareRoutesModel";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import CompareRoutesResults from "./CompareRoutesResults";

const sxStylePaper = {
    p: "1rem",
    pb: "2rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

type CompareRoutesComponentProps = {
    comparedRoutes: CompareRoutes,
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();

    function onDeleteClick(){

    }
    return (
        <Paper sx={sxStylePaper}>
            <CompareRoutesCard route={props.comparedRoutes.compared[0]}/>
            <CompareRoutesCard route={props.comparedRoutes.compared[1]}/>
            {/*    <Box sx={{display: "flex", gap: "1rem",}}>*/}
            <Box sx={{
                display: "flex",
                gap: "1rem",
                borderRadius: 1
            }}>
                <CompareRoutesResults route={props.comparedRoutes.compared[0]}/>
                <CompareRoutesResults route={props.comparedRoutes.compared[1]}/>
              {/*  <Box sx={{backgroundColor: "#3fd44d", width: "50%", borderRadius: 1,}}>
                    <Typography sx={{textAlign: "center"}}>{props.comparedRoutes.compared[0].vehicle.type}</Typography>
                    <Typography
                        sx={{textAlign: "center"}}>{props.comparedRoutes.compared[0].co2EmissionRoute}</Typography>
                </Box>
                <Box sx={{backgroundColor: "#3fd44d", width: "50%", borderRadius: 1,}}>
                    <Typography sx={{textAlign: "center"}}>{props.comparedRoutes.compared[1].vehicle.type}</Typography>
                    <Typography
                        sx={{textAlign: "center"}}>{props.comparedRoutes.compared[1].co2EmissionRoute}</Typography>
                </Box>*/}
            </Box>

            <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.comparedRoutes.comparisonResults.difference} kg
                </Typography>
            </Box>
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p:"1rem"}}
                         variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/compared/details/${props.comparedRoutes.id}`)}>Details</Button>
                <Button variant="outlined" color="error" endIcon={<DeleteIcon/>}
                        onClick={onDeleteClick}>Delete</Button>
            </ButtonGroup>
        </Paper>
    )
}