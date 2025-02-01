import { useAuth0 } from "@auth0/auth0-react"
import Intro from "../components/Intro";

function HomeFeed() {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthenticated) {
        return <Intro />
    }


    return (
        isAuthenticated && user && (
            <div>
                <h1>This is the home page</h1>
            </div>
        )
    );
}

export default HomeFeed;