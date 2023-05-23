import {NewRoute, Route} from "../models/RouteModel";
import React, {createContext, ReactElement, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export type RoutesContextType = {
    routes: Route[],
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>,
    getAllRoutes: () => void,
    getAllRoutesByUserId: (userId: string) => void,
    addRoute: (route: NewRoute) => Promise<Route>,
    deleteRoute: (id: string) => void,
    updateRoute: (id: string, route: Route) => Promise<Route>,
}

export const RoutesContext = createContext<RoutesContextType>({

    routes: [],

    setRoutes: () => {
    },
    addRoute: () => Promise.reject()
    ,
    deleteRoute: () => {
    },
    updateRoute: () => Promise.reject()
    ,
    getAllRoutes: () => {
    },
    getAllRoutesByUserId: () => {
    }
})

type RoutesContextProps = {
    children: ReactElement
}
export default function RoutesContextProvider(props: RoutesContextProps) {
    const [routes, setRoutes] = useState<Route[]>([])

    const contextValue = {
        routes,
        setRoutes,
        addRoute,
        deleteRoute,
        updateRoute,
        getAllRoutes,
        getAllRoutesByUserId
    }

    /* useEffect(() => {
         getAllRoutes()
     }, [])*/

    function getAllRoutes() {
        axios.get("/api/routes")
            .then((response) => {
                setRoutes(response.data)
            })
            .catch((error) => {
                toast.error("No Data available! Logged in? " + error)
            })
    }

    function getAllRoutesByUserId(userId: string) {
        axios.get(`/api/routes/userId/${userId}`)
            .then((response) => {
                setRoutes(response.data)
            })
            .catch((error) => {
                toast.error("No Data available! Logged in? " + error)
            })
    }

    function addRoute(route: NewRoute) {
        return axios.post("/api/routes", route)
            .then((response) => {
                setRoutes([response.data, ...routes])
                return response.data
            })
            .catch((error) => {
                toast.error("Something went wrong! " + error)
                throw error;
            })
    }

    function deleteRoute(id: string) {
        axios.delete(`/api/routes/${id}`)
            .then(() => {
                setRoutes(routes.filter((route) => route.id !== id))
                toast.success("Route successfully deleted")
            })
            .catch((error) => {
                toast.error("Cannot delete! Route doesn't exist or is referenced by comparisons. " + error)
            })
    }

    function updateRoute(id: string, route: Route) {
        return axios.put(`/api/routes/${id}`, route)
            .then((response) => {
                const updatedRoute = response.data;
                setRoutes(prevState => {
                    return prevState.map((currentRoute) => {
                        if (currentRoute.id === updatedRoute.id) {
                            return updatedRoute;
                        }
                        return currentRoute;
                    });
                });
                return updatedRoute;
            })
            .catch((error) =>
                toast.error("Edit not possible, invalid input or route is in use!", error))
    }

    return (
        <RoutesContext.Provider
            value={contextValue}>
            {props.children}
        </RoutesContext.Provider>
    )
}