import {Box, Button, ButtonGroup, Paper} from "@mui/material";
import CompareRoutesCard from "./CompareRoutesCard";
import {CompareRoutes} from "../../models/CompareRoutesModel";
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
    deleteComparisonById: (id: string) => void
}
export default function CompareRoutesComponent(props: CompareRoutesComponentProps) {
    const navigate = useNavigate();

    function onDeleteClick() {
        props.deleteComparisonById(props.comparedRoutes.id);
    }

    return (
        <Paper sx={sxStylePaper}>
            {props.comparedRoutes.compared.map((route) => {
                return <CompareRoutesCard key={route.id} route={route}/>
            })}
            <Box sx={{
                display: "flex",
                gap: "1rem",
                borderRadius: 1
            }}>
               {/* {props.comparedRoutes.compared.map((route) => {*/}
                    <CompareRoutesResults compareRoutes={props.comparedRoutes}/>
             {/*   })}*/}

            </Box>

           {/* <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.comparedRoutes.comparisonResults.difference} kg
                </Typography>
            </Box>*/}
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between", p: "1rem"}}
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