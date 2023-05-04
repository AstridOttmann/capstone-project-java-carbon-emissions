import {Route} from "./RouteModel";
import {ComparisonResults} from "./ComparisonResultsModel";

export type CompareRoutes = {
    id: String,
    compared: Route[],
    comparisonResults: ComparisonResults

}
// export type NewCompareRoutes = Omit<CompareRoutes, "id" | "comparisonResults">