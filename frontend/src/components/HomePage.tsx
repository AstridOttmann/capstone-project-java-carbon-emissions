import Form from "./Form";
import {NewRoute} from "../models/RouteModel";
import {Paper} from "@mui/material";

type HomePageProps = {
    addRoute: (route: NewRoute) => void
}

export default function HomePage(props: HomePageProps) {
    return (
        <Paper sx={{
            pb: "4rem",
            backgroundColor: "#282c34"
        }}>
            <Form addRoute={props.addRoute}/>
        </Paper>
    )
}