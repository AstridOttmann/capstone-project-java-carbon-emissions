import {Box, Button, ButtonGroup, Card, Paper, Typography} from "@mui/material";
import CompareRoutesResults from "./CompareRoutesResults";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import RouteVehicleDetails from "./RouteVehicleDetails";
import {CompareRoutes} from "../models/CompareRoutesModel";
import CompareRoutesCard from "./CompareRoutesCard";
import {useContext, useEffect} from "react";
import {RouteContext} from "../contexts/RouteContextProvider";



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
    comparedRoutes: CompareRoutes
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
    console.log("comparedRoutes", props.comparedRoutes)

    function handleClickBack() {
        navigate(-1)
    }

    function handleClickEditA() {
        navigate("/")
        props.setIsEditMode(true);

        setRoute(props.comparedRoutes.compared[0])
    }

   /* function handleClickEdit() {
        const option1 = props.comparedRoutes.compared[0];
        const option2 = props.comparedRoutes.compared[1];

        if (option1) {
            setRoute(props.comparedRoutes.compared[0])
            navigate("/");
            props.setIsEditMode(true);
            return route;
        } else if (option2) {
            setRoute(props.comparedRoutes.compared[1])
            navigate("/");
            props.setIsEditMode(true);
            return route;
        }
        return "Not found!"
    }*/

    function handleClickEditB() {
        navigate("/")
        props.setIsEditMode(true);

        setRoute(props.comparedRoutes.compared[1])
    }

    return (
        <Paper sx={sxStylePaper}>
            <Typography>Option 1</Typography>
            <Card sx={sxStyleCard}>
                {/*    {props.comparedRoutes.compared.map((route) => {
                    return (
                        <>
                            <CompareRoutesCard key={route.id} route={route}/>
                            <RouteVehicleDetails route={route}/>
                            <Button variant="contained" endIcon={<EditIcon/>}
                                    onClick={handleClickEdit}>Edit</Button>
                        </>
                    )
                })}
*/}
                <CompareRoutesCard route={props.comparedRoutes.compared[0]}/>
                <RouteVehicleDetails route={props.comparedRoutes.compared[0]}/>
                <Button variant="contained" endIcon={<EditIcon/>}
                        onClick={handleClickEditA}>Edit</Button>
            </Card>
            <Typography>Option 2</Typography>
            <Card sx={sxStyleCard}>
                <CompareRoutesCard route={props.comparedRoutes.compared[1]}/>
                <RouteVehicleDetails route={props.comparedRoutes.compared[1]}/>
                <Button variant="contained" endIcon={<EditIcon/>}
                        onClick={handleClickEditB}>Edit</Button>
            </Card>
            <Box sx={{display: "flex", gap: "1rem", borderRadius: 1}}>
                {props.comparedRoutes.compared.map((route) => {
                    return <CompareRoutesResults key={route.id} route={route}/>
                })}
            </Box>

            <Box>
                <Typography variant="body1"
                            sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission
                    by {props.comparedRoutes.comparisonResults.difference} kg
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