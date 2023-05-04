import {Route} from "./RouteModel";

export const testRoute1: Route = {
    start: "hier",
    destination: "dort",
    distance: 50,
    id: "",
    numberOfPersons: 1,
    oneWay: false,
    vehicle:
        {type: "bike", co2Emission: 0, fuel: "", carSize: "", distanceLevel: "", meansOfTransport: ""},
    co2EmissionRoute: 0,
};

export const testRoute2: Route = {
    start: "here",
    destination: "there",
    distance: 50,
    id: "",
    numberOfPersons: 1,
    oneWay: false,
    vehicle:
        {type: "flight", co2Emission: 0, fuel: "", carSize: "", distanceLevel: "", meansOfTransport: ""},
    co2EmissionRoute: 0,
};