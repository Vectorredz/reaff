import { UserDB } from "../../contexts/DatabaseContext";
import { useState, useEffect } from "react";
import ACMembership from "./memberInformation/ACMembership";
import PersonalData from "./memberInformation/PersonalData";
import ContactInfo from "./memberInformation/ContactInfo";
import CommitmentsData from "./reaffiliationInformation/CommitmentsData";
import UpdateForm from "../../components/UpdateForm";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [user, setUser] = useState("")
  const { updateAnswersData, fetchMemberProfile, fetchMemberAnswers, updateMembersData } = UserDB();

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
    console.log( memberData);
  }, [profileData, memberData]);



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
        <div className="border rounded-md p-5">
          <h2 className="font text-lg">Member Information</h2>
          <ACMembership form={memberData} user={user}/>
          <PersonalData form={profileData} user={user}/>
          <ContactInfo form={profileData} user={user}/>
        </div>
        <UpdateForm/>
      </div>
    </div>
  );
}
