import {NewRoute, Route} from "../models/RouteModel";
import React, {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export type RoutesContextType = {
    route?: Route,
    routes: Route[],
    setRoute: (route: Route) => void,
    resetRoute: () => void,
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>,
    getAllRoutes: () => void,
    getRouteById: (id: string) => void,
    addRoute: (route: NewRoute) => void,
    deleteRoute: (id: string) => void,
    updateRoute: (id: string, route: Route) => void
}

export const RoutesContext = createContext<RoutesContextType>({
    route: undefined,
    routes: [],
    setRoute: () => {
    },
    resetRoute: () => {
    },
    setRoutes: () => {
    },
    addRoute: () => {
    },
    deleteRoute: () => {
    },
    updateRoute: () => {
    },
    getAllRoutes: () => {
    },
    getRouteById: () => {
    }

})

type RoutesContextProps = {
    children: ReactElement
}
export default function RoutesContextProvider(props: RoutesContextProps) {
    const [routes, setRoutes] = useState<Route[]>([])

    const initialStateRoute: Route = {
        start: "",
        destination: "",
        distance: 0,
        id: "",
        numberOfPersons: 1,
        oneWay: false,
        vehicle:
            {type: "", co2Emission: 0, fuel: "", carSize: "", distanceLevel: "", meansOfTransport: ""},
        co2EmissionRoute: 0,
    };

    const [route, setRoute] = useState<Route>(initialStateRoute);

    function resetRoute() {
        setRoute(initialStateRoute);
    }

    useEffect(() => {
        getAllRoutes()
    }, [])

    function getAllRoutes() {
        axios.get("/api/routes")
            .then((response) => {
                setRoutes(response.data)
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    function getRouteById(id: string) {
        axios.get(`/api/routes/${id}`)
            .then((response) => {
                setRoute(response.data)
            })
            .catch((error) => {
                toast.error("404 " + error)
            })
    }

    function addRoute(route: NewRoute) {
        axios.post("/api/routes", route)
            .then((response) => {
                setRoutes([...routes, response.data])
                toast("Route successfully added")
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    function deleteRoute(id: string) {
        axios.delete(`/api/routes/${id}`)
            .then(() => {
                setRoutes(routes.filter((route) => route.id !== id))
                toast.success("Route successfully deleted")
            })
            .catch((error) => {
                toast.error("Error! " + error)
            })
    }

    function updateRoute(id: string, route: Route) {
        axios.put(`/api/routes/${id}`, route)
            .then(response => response.data)
            .then(data => setRoutes(prevState => {
                return prevState.map(currentRoute => {
                    if (currentRoute.id === id) {
                        return data;
                    }
                    return currentRoute;
                })
            }))
            .catch((error) =>
                toast.error(error))
    }

    return (
        <RoutesContext.Provider
            value={{
                route,
                routes,
                resetRoute,
                setRoute,
                setRoutes,
                addRoute,
                deleteRoute,
                updateRoute,
                getAllRoutes,
                getRouteById
            }}>
            {props.children}
        </RoutesContext.Provider>
    )
}