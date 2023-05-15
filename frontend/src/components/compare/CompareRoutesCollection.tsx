import {Paper, Typography} from "@mui/material";
import {CompareRoutes} from "../../models/CompareRoutesModel";
import CompareRoutesComponent from "./CompareRoutesComponent";
import {MongoUser} from "../../models/MongoUserModel";

const sxStylePaper = {
    p: "1rem",
    pb: "3rem",
    backgroundColor: "#282c34",
    elevation: "3"
}

const sxStyleTitle = {
    fontSize: "2rem",
    p: "1rem",
    color: "#3fd44d"
}

type CompareRoutesCollectionProps = {
    user: MongoUser,
    compareRoutesList: CompareRoutes[],
    deleteComparisonById: (id: string) => void
}
export default function CompareRoutesCollection(props: CompareRoutesCollectionProps) {
    const userCompareRoutes = props.compareRoutesList.filter((element)=>
        element.userId === props.user.id)

    return (
        <Paper sx={sxStylePaper}>
            <Typography variant="h3" component="h3" sx={sxStyleTitle}>
                My Compared Routes
            </Typography>
            {userCompareRoutes.map((element) => {
                return <CompareRoutesComponent key={element.id}
                                               comparedRoutes={element}
                                               deleteComparisonById={props.deleteComparisonById}/>
            })}
        </Paper>
    )
}