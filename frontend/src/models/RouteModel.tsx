import {Vehicle} from "./VehicleModel";


export type Route = {
    id: string,
    start: string,
    destination: string,
    distance: number,
    numberOfPersons: number,
    oneWay: boolean,
    vehicle: Vehicle,
    co2EmissionRoute: number,
    userId: string
}

export type NewRoute = Omit<Route, "id">