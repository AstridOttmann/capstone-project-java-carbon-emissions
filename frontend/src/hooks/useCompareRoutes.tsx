import {useState} from "react";
import axios from "axios";
import {CompareRoutes, NewCompareRoutes} from "../models/CompareRoutesModel";
import {toast} from "react-toastify";

export default function useCompareRoutes() {

    const initialStateCompareRoutes: CompareRoutes = {
        id: "",
        userId: "",
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
                "co2EmissionRoute": 0,
                userId: ""
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
                co2EmissionRoute: 0,
                userId: ""
            }
        ],
        comparisonResults: {
            resultRouteOne: 0,
            resultRouteTwo: 0,
            usages: []
        }
    }

    const [compareRoutesList, setCompareRoutesList] = useState<CompareRoutes[]>([]);
    const [compareRoutes, setCompareRoutes] = useState<CompareRoutes>(initialStateCompareRoutes);

    function getAllComparisonByUserId(userId: string) {
        axios.get(`/api/compare/userId/${userId}`)
            .then((response) => {
                setCompareRoutesList(response.data)
            })
    }

    function addComparison(compareRoutes: NewCompareRoutes) {
        axios.post("/api/compare", compareRoutes)
            .then((response) => {
                setCompareRoutesList([response.data, ...compareRoutesList])
            })
            .catch((error) => {
                toast.error("Error! Try again later " + error)
            })
    }

    function updateComparison(id: string, comparedRoutes: CompareRoutes) {
        axios.put(`api/compare/${id}`, comparedRoutes)
            .then(response => response.data)
            .then(data => setCompareRoutesList(prevState => {
                return prevState.map(currentState => {
                    return currentState.id === id ? data : currentState
                })
            }))
    }

    function deleteComparisonById(id: string) {
        axios.delete(`/api/compare/${id}`)
            .then(() => {
                setCompareRoutesList(
                    compareRoutesList.filter((comparedRoutes) => comparedRoutes.id !== id))
                toast.success("Deleted!")
            })
            .catch((error) => {
                toast.error("Error!", error)
            })
    }

    function resetAllUsages(userId: string) {
        axios.post(`/api/compare/usages/${userId}`)
            .then((response) => {
                setCompareRoutesList(response.data)
            })
            .catch((error) =>
                toast.error("Reset failed!", error))
    }

    return {
        compareRoutes,
        setCompareRoutes,
        compareRoutesList,
        setCompareRoutesList,
        getAllComparisonByUserId,
        addComparison,
        updateComparison,
        deleteComparisonById,
        resetAllUsages
    }
}
