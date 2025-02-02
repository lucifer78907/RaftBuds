import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Intro from "../components/Intro";
import LoadingSpinner from "../components/LoadingSpinner";
import Post from "../components/Post";
import FeedHeader from "../components/FeedHeader";
import { CREATE_USER, GET_FEED } from "../gql/queries";


function HomeFeed() {
    const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
    const [createUser, { data: userData }] = useMutation(CREATE_USER);
    const { data } = useQuery(GET_FEED, { variables: { userId: userData?.createUser?.id } });

    useEffect(() => {
        // create the user in the db
        if (isAuthenticated && user) {
            const syncUser = async () => {

                const token = await getAccessTokenSilently();

                await createUser({
                    variables: {
                        auth0Id: user.sub,
                        username: user.nickname || user.name,
                        email: user.email,
                        profilePicture: user.picture,
                    },
                    context: {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                });
            }
            syncUser();
        }
    }, [user, isAuthenticated, getAccessTokenSilently, createUser])

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', userData?.createUser?.id)
        }
    }, [userData])


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Intro />
    }


    return (
        <section className="p-6" >
            <FeedHeader user={user} />
            <main>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {data?.getFeed.map((post: PostProps) => {
                        return <Post key={post.id} post={post} />
                    }
                    )}
                </section>
            </main>
        </section>
    );
}

export default HomeFeed;