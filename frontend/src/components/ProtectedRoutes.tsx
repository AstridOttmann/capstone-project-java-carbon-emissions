import {Navigate, Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";

type ProtectedRoutesProps = {
    user: string | undefined,
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
    return props.user ? <Outlet/> : <Navigate to={"/login"}/>
}