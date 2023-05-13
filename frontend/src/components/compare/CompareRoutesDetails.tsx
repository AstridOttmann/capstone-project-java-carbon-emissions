import {Box, Button, ButtonGroup, Card, Paper, Typography} from "@mui/material";
import CompareRoutesResults from "./CompareRoutesResults";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import RouteVehicleDetails from "../routes/RouteVehicleDetails";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import CompareRoutesCard from "./CompareRoutesCard";
import {useContext, useEffect} from "react";
import {RouteContext} from "../../contexts/RouteContextProvider";
import {Route} from "../../models/RouteModel";


const sxStylePaper = {
    m: "1rem",
    p: "1rem",
    pb: "3rem",
    textAlign: "center",
    elevation: "3"
}
const sxStyleCard = {
    mb: "0.8rem"
}

type CompareRoutesDetailsProps = {
    compareRoutes: CompareRoutes
    setIsEditMode: (arg0: boolean) => void,
    getComparisonById: (id: string) => void
}
export default function CompareRoutesDetails(props: CompareRoutesDetailsProps) {
    const {setRoute} = useContext(RouteContext);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.getComparisonById(id)
        }
        //eslint-disable-next-line
    }, [id])

    function handleClickBack() {
        navigate(-1)
    }

    function editOnClick(route: Route) {
        navigate("/")
        props.setIsEditMode(true);

        setRoute(route)
    }

    return (
        <Paper sx={sxStylePaper}>
            {props.compareRoutes.compared.map((route) => {
                return (
                    <> <Card sx={sxStyleCard}>
                        <Typography>Option </Typography>
                        <Box sx={{p: "1rem 0", borderColor: "#3fd44d"}}>
                            <CompareRoutesCard key={route.id} route={route}/>
                            <RouteVehicleDetails route={route}/>
                            <Button variant="contained" endIcon={<EditIcon/>}
                                    onClick={() => editOnClick(route)}>Edit</Button>
                        </Box>
                    </Card>
                    </>
                )
            })}


            <Box sx={{display: "flex", gap: "1rem", borderRadius: 1}}>
                {props.compareRoutes.compared.map((route) => {
                    return <CompareRoutesResults key={route.id} route={route}/>
                })}
            </Box>

            <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.compareRoutes.comparisonResults.difference} kg
                </Typography>
            </Box>
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}}
                         variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={handleClickBack}> Back</Button>
            </ButtonGroup>
        </Paper>
    )
}