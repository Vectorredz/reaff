import Profile from "./components/dashboard/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Home from "./components/dashboard/Home.jsx"
import Logout from "./components/dashboard/Logout.jsx"
import ErrorPage from "./components/ErrorPage.jsx";

const routes = [
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "dashboard/",
    element: <Dashboard/>,
    children: [
      {
        index: true,
        element: <Home/>,
        path: "dashboard/"
      },
      {
        element: <Logout/>,
        path: "logout/"
      },
      {
        element: <Profile/>,
        path: "profile/"
      },
    ]
  },
  {
    path: "signup/",
    element: <Signup />,
  },
  {
    path: "member-profile/",
    element: <Profile />,
  },
];

export default routes;
