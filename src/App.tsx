import { RouterProvider, createBrowserRouter } from "react-router-dom"
// Layout
import RootLayout from "./layout/RootLayout"
// Pages
import HomeFeed from "./pages/HomeFeed"
import AddPost from "./pages/AddPost"
import AddFriends from "./pages/AddFriends"

// TODO - INFINITE SCROLLING
// TODO -MENTION FUNCTIONALITY
// TODO -ADD ERROR ELEMENT
// TODO - REFACTOR LOCALSTORAGE ID GETTING
// TODO - REFACTOR TS CODE
// TODO - REFERSH ON ADD POST/ADD FRIENDS

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
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
