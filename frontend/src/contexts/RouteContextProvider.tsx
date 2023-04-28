import {Route} from "../models/RouteModel";
import {createContext, ReactElement, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


export type RouteContextType = {
    route?: Route,
    setRoute: (route: Route) => void,
    resetRoute: () => void,
    getRouteById: (id: string) => void,
}
export const RouteContext = createContext<RouteContextType>({
    route: undefined,
    setRoute: () => {
    },
    resetRoute: () => {
    },
    getRouteById: () => {
    }
})

type RouteContextProps = {
    children: ReactElement
}
export default function RouteContextProvider(props: RouteContextProps) {
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

    function getRouteById(id: string) {
        axios.get(`/api/routes/${id}`)
            .then((response) => {
                setRoute(response.data)
            })
            .catch((error) => {
                toast.error("404 " + error)
            })
    }

    return <RouteContext.Provider value={{route, setRoute, resetRoute, getRouteById}}>
        {props.children}
    </RouteContext.Provider>
}