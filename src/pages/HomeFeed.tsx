import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import Intro from "../components/Intro";
import LoadingSpinner from "../components/LoadingSpinner";
import Post from "../components/Post";
import FeedHeader from "../components/FeedHeader";
import { CREATE_USER } from "../gql/queries";

const posts = [
    {
        "id": "1",
        "title": "Exploring the Himalayas",
        "description": "A breathtaking journey through the snowy peaks and serene landscapes of the Himalayas.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Amit Sharma", "Neha Verma", "Rahul Malhotra"]
    },
    {
        "id": "2",
        "title": "The Future of AI",
        "description": "How artificial intelligence is shaping our world and what to expect in the coming years.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Rajesh Gupta"]
    },
    {
        "id": "3",
        "title": "Best Coffee Spots in New York",
        "description": "Discover the top cafes in NYC for coffee lovers and digital nomads.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Sanya Kapoor", "Vikram Singh"]
    },
    {
        "id": "4",
        "title": "A Guide to Minimalist Living",
        "description": "Declutter your life and embrace a minimalist lifestyle with these simple tips.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Pooja Mishra"]
    },
    {
        "id": "5",
        "title": "Photography Tips for Beginners",
        "description": "Learn essential techniques to capture stunning photos with any camera.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Rahul Malhotra", "Sneha Agarwal"]
    },
    {
        "id": "6",
        "title": "Top 10 Travel Destinations in 2024",
        "description": "A curated list of must-visit places for your travel bucket list this year.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Meera Nair"]
    },
    {
        "id": "7",
        "title": "Healthy Eating on a Budget",
        "description": "How to eat nutritious meals without breaking the bank.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Nikhil Patil", "Ananya Joshi"]
    },
    {
        "id": "8",
        "title": "The Rise of Electric Vehicles",
        "description": "How EVs are revolutionizing transportation and reducing carbon footprints.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Aarav Mehta"]
    },
    {
        "id": "9",
        "title": "Mastering React for Web Development",
        "description": "A beginner-friendly guide to building modern web apps with React.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Siddharth Roy", "Priya Desai"]
    },
    {
        "id": "10",
        "title": "The Power of Meditation",
        "description": "Unlock mental clarity and peace through daily meditation practices.",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "tags": ["Kiran Rao"]
    }
]



function HomeFeed() {
    const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
    const [createUser] = useMutation(CREATE_USER);

    useEffect(() => {
        // create the user in the db
        if (isAuthenticated && user) {
            const syncUser = async () => {
                console.log(user);

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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Intro />
    }


    return (
        isAuthenticated && user && (
            <section className="p-6">
                <FeedHeader user={user} />
                <main>
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {posts.map((post) => {
                            return (
                                <Post key={post.id} user={user} post={post} />
                            )
                        }
                        )}
                    </section>
                </main>
            </section>
        )
    );
}

export default HomeFeed;