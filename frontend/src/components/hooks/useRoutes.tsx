import {useEffect, useState} from "react";
import {NewRoute, Route} from "../../models/RouteModel";
import axios from "axios";
import {toast} from "react-toastify";

export default function useRoutes() {
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(()=> {
        getAllRoutes()
    }, [])

    function getAllRoutes(){
        axios.get("/api/routes")
            .then((response)=> {
                setRoutes(response.data)
            })
            .catch((error)=> {
                (toast.error("Error! Try again later" + error))
            })
    }

    function addRoute(route: NewRoute) {
        axios.post("/api/routes", route)
            .then((response) => {
                setRoutes([...routes, response.data])
                toast("Route successfully added")
            })
            .catch((error) => {
                (toast.error("Error! Try again later" + error))
            })
    }
    return {routes, addRoute}
}