import {Route} from "./RouteModel";
import {ComparisonResults} from "./ComparisonResultsModel";

export type CompareRoutes = {
    id: string,
    compared: Route[],
    comparisonResults: ComparisonResults

}
// export type NewCompareRoutes = Omit<CompareRoutes, "id" | "comparisonResults">