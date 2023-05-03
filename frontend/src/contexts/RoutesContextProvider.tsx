import {NewRoute, Route} from "../models/RouteModel";
import React, {createContext, ReactElement, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export type RoutesContextType = {
    routes: Route[],
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>,
    getAllRoutes: () => void,
    //getRouteById: (id: string) => void,
    addRoute: (route: NewRoute) => void,
    deleteRoute: (id: string) => void,
    updateRoute: (id: string, route: Route) => void
}

export const RoutesContext = createContext<RoutesContextType>({

    routes: [],

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


})

type RoutesContextProps = {
    children: ReactElement
}
export default function RoutesContextProvider(props: RoutesContextProps) {
    const [routes, setRoutes] = useState<Route[]>([])


    const contextValue = useMemo(() => ({
        routes,
        setRoutes,
        addRoute,
        deleteRoute,
        updateRoute,
        getAllRoutes,
        //eslint-disable-next-line
    }), [routes]);

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

    function addRoute(route: NewRoute) {
        axios.post("/api/routes", route)
            .then((response) => {
                setRoutes([response.data,...routes])
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
            value={contextValue}>
            {props.children}
        </RoutesContext.Provider>
    )
}