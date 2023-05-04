import {useState} from "react";
import {Route} from "../models/RouteModel";
import axios from "axios";
import {CompareRoutes} from "../models/CompareRoutesModel";
import {toast} from "react-toastify";
import {testRoute1, testRoute2} from "../models/dummyData";

export default function useCompareRoutes() {
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([]);

    const initialStateComparedRoute: CompareRoutes = {
        id: "",
        compared: [testRoute1, testRoute2],
        comparisonResults:
            {
                resultRouteOne: 0, resultRouteTwo: 0, difference: 0
            }
    };

    const [comparedRoutes, setComparedRoutes] = useState<CompareRoutes[]>([]);
    const [comparedRoute, setComparedRoute] = useState<CompareRoutes>(initialStateComparedRoute);

    function addComparison(comparedRoute: CompareRoutes) {
        axios.post("/api/compare", comparedRoute.compared)
            .then((response) => {
                setComparedRoutes([...comparedRoutes, response.data])
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    return {routesToCompare, setRoutesToCompare, comparedRoute, setComparedRoute, addComparison}
}