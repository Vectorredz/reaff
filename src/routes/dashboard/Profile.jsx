import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import ACMembership from "./profile-pages/ACMembership";
import PersonalData from "./profile-pages/PersonalData";
import ContactInfo from "./profile-pages/ContactInfo";
import CommitmentsData from "./profile-pages/CommitmentsData";
import UpdateForm from "../../components/UpdateForm";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [user, setUser] = useState("")
  const { updateAnswersData, fetchMemberProfile, fetchMemberAnswers  } = useOutletContext();

  async function handleFetch() {
    const profileRawData = await fetchMemberProfile()
    const memberRawData = await fetchMemberAnswers()
    setProfileData(profileRawData?.data[0]);
    setMemberData(memberRawData?.data[0]?.answers);
    setUser(profileRawData?.data[0]?.id)
  }

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    // console.log(memberData);
    // console.log(profileData, user)
  }, [profileData, memberData, user]);

  return (
    <div className='p-5'>
      <div className='memberData'>
        Announcements:
        This needs to be updated:
        - Commitments
        - Organization
        - etc. etc
      </div>
      <div>
        <h1 className="font text-2xl">Member Profile</h1>
      </div>
      <div>
        <ACMembership form={memberData} user={user} updateAnswersData={updateAnswersData}/>
        <PersonalData form={profileData} user={user} updateAnswersData={updateAnswersData}/>
        <ContactInfo form={profileData} user={user} updateAnswersData={updateAnswersData}/>
        <UpdateForm/>
      </div>
    </div>
  );
}
