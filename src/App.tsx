import { RouterProvider, createBrowserRouter } from "react-router-dom"
// Layout
import RootLayout from "./layout/RootLayout"
// Pages
import HomeFeed from "./pages/HomeFeed"
import AddPost from "./pages/AddPost"
import AddFriends from "./pages/AddFriends"
import ErrorPage from "./pages/ErrorPage"
import MyPosts from "./pages/MyPosts"
import UnfollowPeople from "./pages/Unfollow"

// TODO -REFACTOR & CLEANUP
// TODO -FIX MINOR BUGS AND HICCUPS

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomeFeed />
        },
        {
          path: 'add-post',
          element: <AddPost />
        },
        {
          path: 'add-friends',
          element: <AddFriends />
        },
        {
          path: 'my-posts',
          element: <MyPosts />
        },
        {
          path: 'unfollow',
          element: <UnfollowPeople />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
