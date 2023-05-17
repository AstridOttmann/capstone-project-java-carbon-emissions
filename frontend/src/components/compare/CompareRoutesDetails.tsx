import {Box, Button, ButtonGroup, Card, Paper, Typography} from "@mui/material";
import CompareRoutesResults from "./CompareRoutesResults";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import RouteVehicleDetails from "../routes/RouteVehicleDetails";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import CompareRoutesCard from "./CompareRoutesCard";
import React, {useContext, useEffect} from "react";
import {RouteContext} from "../../contexts/RouteContextProvider";
import {Route} from "../../models/RouteModel";
import {User} from "../../models/MongoUserModel";


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
    user: User,
    setUser: (user: User) => void,
    compareRoutes: CompareRoutes,
    setCompareRoutes: React.Dispatch<React.SetStateAction<CompareRoutes>>,
    setIsEditMode: (arg0: boolean) => void,
    getComparisonById: (id: string) => void,
    getAllComparison: () => void,
    updateComparison: (id: string, comparedRoutes: CompareRoutes) => void,
    updateScore: (id: string, user: User) => void
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
                {/*   {props.compareRoutes.compared.map((route) => {*/}
                <CompareRoutesResults user={props.user}
                                      setUser={props.setUser}
                                      updateScore={props.updateScore}
                                      compareRoutes={props.compareRoutes}
                                      setCompareRoutes={props.setCompareRoutes}
                                      updateComparison={props.updateComparison}
                                      getAllComparison={props.getAllComparison}/>
                {/*   })}*/}
            </Box>

            <Box>
                <Typography variant="body1" sx={{p: "1rem", mt: "1rem", textAlign: "center", backgroundColor: "ghostwhite"}}>
                    You can reduce your CO2-Emission by {props.compareRoutes.comparisonResults.resultRouteTwo} kg
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