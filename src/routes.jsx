import Profile from "./components/dashboard/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Home from "./components/dashboard/Home.jsx"
import Logout from "./components/dashboard/Logout.jsx"
import ErrorPage from "./components/ErrorPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PersonalDetails from "./components/affiliation/PersonalDetails.jsx";
import CommitteeConcerns from "./components/affiliation/CommitteeConcerns.jsx";
import Commitments from "./components/affiliation/Commitments.jsx";
import Payment from "./components/affiliation/Payment.jsx";



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
      { path: "committee-concerns/", element: <CommitteeConcerns /> },
      { path: "payment/", element: <Payment /> }
    ]
  },
  { path: "member-profile/", element: <Profile /> }
];
export default routes;
