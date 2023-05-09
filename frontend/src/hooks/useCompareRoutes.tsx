import {useEffect, useState} from "react";
import axios from "axios";
import {CompareRoutes} from "../models/CompareRoutesModel";
import {toast} from "react-toastify";

export default function useCompareRoutes() {

    const initialStateComparedRoutes: CompareRoutes = {
        id: "",
        compared: [
            {
                id: " ",
                start: "",
                destination: "",
                distance: 0,
                numberOfPersons: 1,
                oneWay: true,
                vehicle: {
                    type: "",
                    co2Emission: 0,
                    fuel: "",
                    carSize: "",
                    distanceLevel: "",
                    meansOfTransport: ""
                },
                "co2EmissionRoute": 0
            },
            {
                id: "",
                start: "",
                destination: "",
                distance: 0,
                numberOfPersons: 1,
                oneWay: true,
                vehicle: {
                    type: "",
                    co2Emission: 0,
                    fuel: "",
                    carSize: "",
                    distanceLevel: "",
                    meansOfTransport: ""
                },
                co2EmissionRoute: 0
            }
        ],
        comparisonResults: {
            resultRouteOne: 0,
            resultRouteTwo: 0,
            difference: 0
        }
    }

    const [comparedRoutesList, setComparedRoutesList] = useState<CompareRoutes[]>([]);
    const [comparedRoutes, setComparedRoutes] = useState<CompareRoutes>(initialStateComparedRoutes);

    useEffect(() => {
        getAllComparison()
    }, [])

    function getAllComparison() {
     return axios.get("/api/compare")
            .then((response) => {
                setComparedRoutesList(response.data)
            })
    }

    function getComparisonById(id: string) {
        axios.get(`/api/compare/${id}`)
            .then((response) => {
                setComparedRoutes(response.data)
            })
            .catch((error) => {
                toast.error("404 " + error)
            })
    }

    function addComparison(comparedRoutes: CompareRoutes) {
        axios.post("/api/compare", comparedRoutes.compared)
            .then((response) => {
                setComparedRoutesList([...comparedRoutesList, response.data])
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    function updateComparison(id: string, comparedRoutes: CompareRoutes) {
        axios.put(`api/compare/${id}`, comparedRoutes)
            .then(response => response.data)
            .then(data => setComparedRoutesList(prevState => {
                return prevState.map(currentState => {
                    return currentState.id === id ? data : currentState
                    /*if (currentState.id === id) {
                        return data;
                    }
                    return currentState;*/
                })
            }))
    }

    function deleteComparisonById(id: string) {
        axios.delete(`/api/compare/${id}`)
            .then(() => {
                setComparedRoutesList(
                    comparedRoutesList.filter((comparedRoutes) => comparedRoutes.id !== id))
                toast.success("Deleted!")
            })
            .catch((error) => {
                toast.error("Error!", error)
            })
    }

    return {
        comparedRoutes,
        setComparedRoutes,
        comparedRoutesList,
        setComparedRoutesList,
        getAllComparison,
        getComparisonById,
        addComparison,
        updateComparison,
        deleteComparisonById
    }
}
