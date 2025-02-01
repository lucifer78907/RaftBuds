import { useAuth0 } from "@auth0/auth0-react"
import Intro from "../components/Intro";
import LoadingSpinner from "../components/LoadingSpinner";

function HomeFeed() {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) {
        return <LoadingSpinner />;
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