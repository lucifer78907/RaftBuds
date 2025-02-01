import { Outlet } from "react-router-dom"
import Login from "../components/Login"

function RootLayout() {
    return (
        <>
            <Login />
            <Outlet />
        </>
    )
}

export default RootLayout