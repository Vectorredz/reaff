import { UserDB } from "../../contexts/DatabaseContext";
import { UserAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import ACMembership from "./memberInformation/ACMembership";
import PersonalData from "./memberInformation/PersonalData";
import ContactInfo from "./memberInformation/ContactInfo";
import CommitmentsData from "./reaffiliationInformation/CommitmentsData";
import UpdateForm from "../../components/UpdateForm";
import AssessmentData from "./reaffiliationInformation/AssessmentData";
import OrganizationData from "./reaffiliationInformation/OrganizationInfo";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [uid, setUid] = useState("")
  const { updateAnswersData, fetchMemberProfile, fetchMemberAnswers, updateMembersData } = UserDB();
  const { getUser } = UserAuth();

  async function handleFetch() {
    const result = await getUser()
    const profileRawData = await fetchMemberProfile(result?.data?.user?.id)
    const memberRawData = await fetchMemberAnswers(result?.data?.user?.id)
    setUid(result?.data?.user?.id)
    setProfileData(profileRawData?.data);
    setMemberData(memberRawData?.data?.answers);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    console.log(profileData, memberData);
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
          <ACMembership form={memberData} uid={uid}/>
          <PersonalData form={profileData} uid={uid}/>
          <ContactInfo form={profileData} uid={uid}/>
        </div>
        <div className="border rounded-md p-5">
          <h2 className="font text-lg">Reaffiliation Information</h2>
          <CommitmentsData form={memberData} uid={uid}/>
          <AssessmentData form={memberData} uid={uid}/>
          <OrganizationData form={memberData} uid={uid}/>
        </div>

        <UpdateForm/>
      </div>
    </div>
  );
}
