import { RouterProvider, createBrowserRouter } from "react-router-dom"
// Layout
import RootLayout from "./layout/RootLayout"
// Pages
import HomeFeed from "./pages/HomeFeed"

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
