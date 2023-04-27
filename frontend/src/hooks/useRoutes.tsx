import {useEffect, useState} from "react";
import {NewRoute, Route} from "../models/RouteModel";
import axios from "axios";
import {toast} from "react-toastify";

export default function useRoutes() {
    const initialStateRoute = {
        start: "",
        destination: "",
        distance: 0,
        id: "",
        numberOfPersons: 0,
        oneWay: false,
        vehicle:
            {type: "", co2Emission: 0, fuel: "", carSize: "", distanceLevel: "", meansOfTransport: ""},
        co2EmissionRoute: 0,

    }
    const [routes, setRoutes] = useState<Route[]>([]);
    const [route, setRoute] = useState<Route>(initialStateRoute)

    useEffect(() => {
        getAllRoutes()
    }, [])

    function getAllRoutes() {
        axios.get("/api/routes")
            .then((response) => {
                setRoutes(response.data)
            })
            .catch((error) => {
                (toast.error("Error! Try again later" + error))
            })
    }

    function getRouteById(id: string) {
        axios.get(`/api/routes/${id}`)
            .then((response) => {
                setRoute(response.data)
            })
            .catch((error) => {
                toast.error(("404" + error))
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

    return {routes, route, getRouteById, setRoute, addRoute, initialStateRoute}
}