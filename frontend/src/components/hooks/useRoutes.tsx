import {useState} from "react";
import {NewRoute, Route} from "../../models/RouteModel";
import axios from "axios";

export default function useRoutes() {
    const [routes, setRoutes] = useState<Route[]>([]);

    function addRoute(route: NewRoute) {
        axios.post("/api/routes", route)
            .then(response => response.data)
            .then(data => setRoutes([...routes, data]))
            .catch(reason => console.error(reason))
    }

    return {routes, addRoute}
}