import {useState} from "react";
import {Route} from "../models/RouteModel";
import axios from "axios";
import {CompareRoutes, NewCompareRoutes} from "../models/CompareRoutesModel";
import {toast} from "react-toastify";

export default function useCompareRoutes() {
    const [routesToCompare, setRoutesToCompare] = useState<Route[]>([]);

   /* const initialStateCompareRoutes: CompareRoutes = {
        id: "",
        compared: [],
        comparisonResults:
            {
                resultRouteOne: 0, resultRouteTwo: 0, difference: 0
            }
    };*/

    const [comparedRoutes, setComparedRoutes] = useState<CompareRoutes[]>([]);

    function addComparison(compareRoutes: NewCompareRoutes) {
        axios.post("/api/compare", compareRoutes.compared)
            .then((response) => {
                setComparedRoutes([...comparedRoutes, response.data])
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    return {routesToCompare, setRoutesToCompare, addComparison}
}