import { Outlet, useLocation } from "react-router-dom"
import Login from "../components/Login"
import { useAuth0 } from "@auth0/auth0-react"
import NotAuthenticated from "../pages/NotAuthenticated";

function RootLayout() {
    const { isAuthenticated } = useAuth0();
    const location = useLocation();

    if (!isAuthenticated && location.pathname !== '/') {
        return <NotAuthenticated />
    }

    return (
        <>
            <Login />
            <Outlet />
        </>
    )
}

export default RootLayout