import {Button, ButtonGroup, Card, Divider, Paper, Stack, styled, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RouteContext} from "../../contexts/RouteContextProvider";
import RouteVehicleDetails from "./RouteVehicleDetails";

const sxStylePaper = {
    p: "1rem",
    pb: "3rem",
    backgroundColor: "#282c34",
    elevation: "3"
}
const sxStyleCard = {
    p: "1rem",
    mb: "2rem",
    border: "1",
    borderColor: "#3fd44d"
}
const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d"
}
const Item = styled('div')(({theme}) => ({
    backgroundColor: "#B3BDB3",
    border: "1",
    borderColor: "#3fd44d",
    padding: "1rem",
    borderRadius: 4,
    marginBottom: "0.5rem",
}));

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
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                Route Details
            </Typography>
            {route ? (
                    <Card sx={sxStyleCard} variant="outlined">
                        <Typography variant="overline">Route</Typography>
                        <Stack>
                            <Item><small>FROM:</small> {route.start}</Item>
                            <Item><small>TO:</small> {route.destination}</Item>
                            <Item><small>DISTANCE:</small> {route.distance} km</Item>
                            <Item><small>NUMBER OF PERSONS:</small> {route.numberOfPersons}</Item>
                            <Item>{route.oneWay ? "ONEWAY" : "ROUND TRIP"}</Item>
                        </Stack>
                        <Divider sx={{borderColor: "#808080"}}/>
                        <RouteVehicleDetails route={route}/>

                        <Typography variant="overline">CO2-Emission Route</Typography>
                        <Stack sx={{textAlign: "center"}}>
                            <Item><small>PRO PERSON IN KG: </small> {route.co2EmissionRoute}</Item>
                        </Stack>
                        <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                                     variant="text"
                                     aria-label="text button group">
                            <Button variant="outlined"
                                    onClick={handleClickBack}>Back</Button>
                            <Button variant="contained" endIcon={<EditIcon/>}
                                    onClick={handleClickEdit}>Edit</Button>
                        </ButtonGroup>
                    </Card>)
                : <div>Loading ...</div>}
        </Paper>
    )
}