import Form from "./Form";
import {NewRoute} from "../models/RouteModel";
import {NavLink} from "react-router-dom";


type HomePageProps = {
    addRoute: (route: NewRoute) => void
}

export default function HomePage(props: HomePageProps) {
    return (
        <>
            <Form addRoute={props.addRoute}/>
            <NavLink className="start-link" to="/routes">Visit my route collection</NavLink>
        </>
    )
}