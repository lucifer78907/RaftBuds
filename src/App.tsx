import { RouterProvider, createBrowserRouter } from "react-router-dom"
// Layout
import RootLayout from "./layout/RootLayout"
// Pages
import HomeFeed from "./pages/HomeFeed"
import AddPost from "./pages/AddPost"
import AddFriends from "./pages/AddFriends"
import ErrorPage from "./pages/ErrorPage"

// TODO - INFINITE SCROLLING
// TODO -MENTION FUNCTIONALITY
// TODO - REFERSH ON ADD POST/ADD FRIENDS

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
