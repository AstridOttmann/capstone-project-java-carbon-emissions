import {Navigate, Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {User} from "../models/MongoUserModel";

type ProtectedRoutesProps = {
    user: User,
    isLoading: boolean
}
export default function ProtectedRoutes(props: ProtectedRoutesProps) {

    if (props.isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress/>
            </div>
        )
    }
    return props.user.id  ? <Outlet/> : <Navigate to={"/login"}/>
}