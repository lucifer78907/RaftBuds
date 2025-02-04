import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Intro from "../components/Intro";
import LoadingSpinner from "../components/LoadingSpinner";
import Post from "../components/Post";
import FeedHeader from "../components/FeedHeader";
import { CREATE_USER, GET_FEED_WITH_CURSOR } from "../gql/queries";

function HomeFeed() {
    const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
    const [createUser, { data: userData }] = useMutation(CREATE_USER);

    // State for infinite scroll
    const [feed, setFeed] = useState<PostProps[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const { fetchMore } = useQuery(GET_FEED_WITH_CURSOR, {
        variables: { userId: userData?.createUser?.id, limit: 2, nextCursor: null },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            setFeed(data.getFeedWithCursor.posts);
            setCursor(data.getFeedWithCursor.nextCursor);
            setHasMore(Boolean(data.getFeedWithCursor.nextCursor));
        },
    });

    const fetchMoreData = () => {
        if (!cursor) return;

        fetchMore({
            variables: {
                userId: userData?.createUser?.id,
                nextCursor: cursor,
                limit: 2,
            },
            updateQuery: (_, { fetchMoreResult }) => {
                const newPosts = fetchMoreResult.getFeedWithCursor.posts;
                const newCursor = fetchMoreResult.getFeedWithCursor.nextCursor;
                setFeed((prevFeed) => [...prevFeed, ...newPosts]);
                setCursor(newCursor);
                setHasMore(Boolean(newCursor));
            },
        });
    };

    useEffect(() => {
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
                    context: { headers: { Authorization: `Bearer ${token}` } },
                });
            };
            syncUser();
        }
    }, [user, isAuthenticated, getAccessTokenSilently, createUser]);

    useEffect(() => {
        if (userData) {
            localStorage.setItem("userData", userData?.createUser?.id);
        }
    }, [userData]);

    if (isLoading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Intro />;

    return (
        <section className="p-6">
            <FeedHeader nickname={user?.nickname || 'No nickname'} name={user?.name || 'User'} />
            <main>
                <InfiniteScroll
                    dataLength={feed.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<LoadingSpinner />}
                    endMessage={<p className="mt-10 text-3xl text-center text-gray-300 tracking-tight">No more posts!</p>}
                    style={{ overflow: 'hidden' }}
                >
                    <section className="grid grid-cols-1  gap-8 w-[40%] mx-auto items-start">
                        {feed.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </section>
                </InfiniteScroll>
            </main>
        </section>
    );
}

export default HomeFeed;
