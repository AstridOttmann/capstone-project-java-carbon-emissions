import {Box, Button, ButtonGroup, Card, Paper, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RouteContext} from "../../contexts/RouteContextProvider";
import RouteVehicleDetails from "./RouteVehicleDetails";
import RouteVehicleIcon from "./RouteVehicleIcon";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const sxStylePaper = {
    maxWidth: "sm",
    m: "0 auto",
    position: "relative",
    top: "4rem",
    p: "1rem",
    pb: "3rem",
    elevation: "3"
}
const sxStyleCard = {
    p: "1rem",
    mb: "2rem",
    border: "1",

}
const sxStyleBox1And4 = {
    backgroundColor: "#B3BDB3",
    borderRadius: "10px",
    p: "1rem",
    mb: "1rem"
}

const sxStyleTitle = {
    p: "1rem",
    color: "primary"
}

type RouteDetailsProps = {
    setIsEditMode: (arg0: boolean) => void
}
export default function RouteDetails(props: RouteDetailsProps) {
    const {route, resetRoute, getRouteById} = useContext(RouteContext);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getRouteById(id)
        }
        //eslint-disable-next-line
    }, [id])

    function handleClickBack() {
        navigate(-1)
        resetRoute()
    }

    function handleClickEdit() {
        navigate("/")
        props.setIsEditMode(true);
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h5" component="h2" sx={sxStyleTitle}>
                Route Details
            </Typography>
            {route ? (
                    <Card sx={sxStyleCard} variant="outlined">
                        <Box sx={sxStyleBox1And4}>
                            <Typography color="primary" sx={{fontSize: "1.2rem"}}>Route</Typography>
                            <Typography><small>FROM:</small> {route.start}</Typography>
                            <Typography><small>TO:</small> {route.destination}</Typography>
                        </Box>
                        <Box sx={{backgroundColor: "#cd5300", borderRadius: "10px", p: "1rem", mb: "1rem"}}>
                            <Typography color="#B3BDB3" sx={{fontSize: "1.2rem"}}>Route Info</Typography>
                            <Typography><small>DISTANCE:</small> {route.distance} km</Typography>
                            <Typography><small>NUMBER OF PERSONS:</small> {route.numberOfPersons}</Typography>
                            <Typography
                                sx={{}}><small> - {route.oneWay ? "one way" : "round trip"} - </small></Typography>
                        </Box>
                        <Box sx={{backgroundColor: "#008d0d", borderRadius: "10px", p: "1rem", mb: "1rem"}}>
                            <Typography color="#B3BDB3" sx={{fontSize: "1.2rem"}}>Vehicle Info</Typography>
                            <RouteVehicleIcon route={route}/>
                            <RouteVehicleDetails route={route}/>
                        </Box>
                        <Box sx={sxStyleBox1And4}>
                            <Typography color="secondary" sx={{fontSize: "1.2rem"}}>Result</Typography>
                            <Typography color="secondary">Co2-Emission Route</Typography>
                            <Typography><small>PRO PERSON IN KG: </small> {route.co2EmissionRoute}</Typography>
                        </Box>
                        <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                                     variant="text"
                                     aria-label="text button group">
                            <Button variant="text"
                                    onClick={handleClickBack}><ArrowBackIosIcon sx={{fontSize: 45}}/></Button>
                            <Button variant="text" onClick={handleClickEdit}><EditIcon sx={{fontSize: 45}}/></Button>
                        </ButtonGroup>
                    </Card>)
                : <div>Loading ...</div>}
        </Paper>
    )
}