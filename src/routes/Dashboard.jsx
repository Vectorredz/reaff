import { Outlet, Link } from "react-router";
import { UserDB } from "../contexts/DatabaseContext.jsx";
export default function Dashboard() {
  const { updateAnswersData, fetchMemberProfile, fetchMemberAnswers } = UserDB();
  return (
    <div className="flex">
      <nav className="border w-50 h-auto">
        <div>
          <label>Main</label>
          <ul>
            <Link to="home">Home</Link>
            <Link to="logout">Logout</Link>
          </ul>
        </div>
        <div>
          <label htmlFor="">Affiliation</label>
          <ul>
            <Link to="profile">Member Profile</Link>
          </ul>
        </div>
      </nav>
      <Outlet context={{ updateAnswersData, fetchMemberProfile, fetchMemberAnswers }} />
    </div>
  );
}
