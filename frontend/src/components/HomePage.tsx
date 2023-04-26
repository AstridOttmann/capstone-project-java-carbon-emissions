import Form from "./Form";
import {NewRoute, Route} from "../models/RouteModel";
import {Paper} from "@mui/material";

type HomePageProps = {
    initialStateRoute: Route,
    route: Route,
    setRoute: (route: Route)=> void,
    addRoute: (route: NewRoute) => void
}

export default function HomePage(props: HomePageProps) {
    return (
        <Paper sx={{
            pb: "4rem",
            backgroundColor: "#282c34"
        }}>
            <Form initialStateRoute={props.initialStateRoute}
                  route={props.route}
                  setRoute={props.setRoute}
                  addRoute={props.addRoute}/>
        </Paper>
    )
}