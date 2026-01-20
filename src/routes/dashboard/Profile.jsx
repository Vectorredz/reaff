import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import ACMembership from "./profile-pages/ACMembership";
import PersonalData from "./profile-pages/PersonalData";
import ContactInfo from "./profile-pages/ContactInfo";
import CommitmentsData from "./profile-pages/CommitmentsData";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const { fetchMemberProfile, fetchMemberAnswers  } = useOutletContext();

  async function handleFetch() {
    setProfile(await fetchMemberProfile());
    setForm(await fetchMemberAnswers());
  }

  useEffect(() => {
    handleFetch();
  }, []);

  // useEffect(() => {
  //   console.log(form);
  //   console.log(profile)
  // }, [profile, form]);

  return (
    <div>
      <div className='form'>
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
        <ACMembership />
        <PersonalData form={profile} />
        <ContactInfo form={profile} />
      </div>
    </div>
  );
}
