import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    user: string | undefined
}
export default function ProtectedRoutes(props: ProtectedRoutesProps) {
    const authenticated = props.user !== undefined && props.user !== 'anonymousUser';

    return (
        authenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}