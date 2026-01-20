import Profile from "./routes/dashboard/Profile.jsx";
import Dashboard from "./routes/Dashboard.jsx"
import Login from "./routes/Login.jsx"
import Signup from "./routes/Signup.jsx"
import Home from "./routes/dashboard/Home.jsx"
import Logout from "./routes/dashboard/Logout.jsx"
import ErrorPage from "./routes/ErrorPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PersonalDetails from "./routes/affiliation/PersonalDetails.jsx";
import Commitments from "./routes/affiliation/Commitments.jsx";
import Payment from "./routes/affiliation/Payment.jsx";
import Events from "./routes/affiliation/organization-pages/Events.jsx"
import Organization from "./routes/affiliation/Organization.jsx"
import Preferences from "./routes/affiliation/organization-pages/Preferences.jsx"
import Concerns from "./routes/affiliation/organization-pages/Concerns.jsx"
import CreateAccount from "./routes/affiliation/CreateAccount.jsx";



const routes = [
  { path: "/", element: <Login /> },
  { path: "login/", element: <Login /> },
  {
    path: "dashboard/",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      { index: true, path: "home/", element: <Home /> },
      { path: "logout/", element: <Logout /> },
      { path: "profile/", element: <Profile /> }
    ]
  },
  {
    path: "signup/",
    element: <Signup />,
    children: [
      { index: true, element: <PersonalDetails/> },
      { path: "personal-details/", element: <PersonalDetails /> },
      { path: "commitments/", element: <Commitments /> },
      { path: "organization-related/", 
        element: <Organization /> , 
        children: [
          { index: true, element: <Preferences/>},
          { path:"preferences", element: <Preferences/> },
          { path:"events", element: <Events/>},
          { path:"concerns", element: <Concerns/>}
        ]},
      { path: "payment/", element: <Payment /> },
      { path: "create-account/", element: <CreateAccount/>}
    ]
  },
  { path: "member-profile/", element: <Profile /> }
];
export default routes;
