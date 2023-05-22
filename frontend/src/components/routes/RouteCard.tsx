import {Box, Button, Card, Divider} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {RoutesContext} from "../../contexts/RoutesContextProvider";
import {Route} from "../../models/RouteModel";
import RouteInfo from "./RouteInfo";
import RouteDestination from "./RouteDestination";
import RouteIconBox from "./RouteIconBox";
import EditNoteIcon from '@mui/icons-material/EditNote';

const sxStyleCard = {
    width: "48%",
    p: "1rem",
    mb: "1rem",
    border: "4px solid #fff"

}

type RouteCardProps = {
    route: Route,
}
export default function RouteCard(props: RouteCardProps) {
    const {deleteRoute} = useContext(RoutesContext)
    const navigate = useNavigate();

    function onDeleteClick() {
        deleteRoute(props.route.id)
    }

    return (<>
        {props.route &&
            <Card variant="outlined" sx={sxStyleCard}>
                <RouteDestination route={props.route}/>
                <Box sx={{display: "flex", justifyContent: "center", m: "1rem auto"}}>
                    <RouteIconBox route={props.route}/>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{m: "0 0.5rem"}}/>
                    {/* <Divider variant="inset" orientation="vertical"
                             sx={{height: "4px", width: "40%", transform: "rotate(90deg)"}}/>*/}
                    <RouteInfo route={props.route}/>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button size="small" variant="text" color="error" onClick={onDeleteClick} sx={{minWidth: "fit-content", m: "0", p: "0"}}>
                        <DeleteIcon sx={{fontSize: 20}}/>
                    </Button>
                    <Button size="small" variant="text"
                            onClick={() => navigate(`/routes/details/${props.route.id}`)} sx={{minWidth: "fit-content", m: "0", p: "0"}}>
                        <EditNoteIcon/>
                    </Button>
                </Box>
            </Card>}
    </>)
}