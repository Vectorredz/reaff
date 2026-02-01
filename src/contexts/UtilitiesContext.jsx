import { createContext, useContext } from "react";

const UtilitiesContext = createContext()
export const UtilitiesContextProvider = ( {children}) => {
  const decoderMap = {
    // personalInfo
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    suffix: "Suffix",
    currentAddress: "Current Address",
    birthday: "Birthday",
    gender: "Gender",
    studentNumber: "Student Number",
    year: "Year",
    degreeProgram: "Degree Program",
    college: "College",
    expectedGradYear: "Expected Graduation Year",
    highschool: "High School",
    primaryEmail: "Primary Email",
    upEmail: "UP Email",
    phone: "Phone Number",
    telephone: "Telephone",
    emergencyName: "Emergency Contact Name",
    emergencyRelation: "Emergency Contact Relation",
    emergencyPhone: "Emergency Contact Phone",
    mbti: "MBTI",
    discord: "Discord",
    facebook: "Facebook",

    // committees
    logistics: "Logistics",
    publicRelations: "Public Relations",
    publicity: "Publicity",
    marketing: "Marketing",
    records: "Records",
    membership: "Membership",
    education: "Education",
  };
  return <UtilitiesContext.Provider value={{decoderMap}}>
      {children}
    </UtilitiesContext.Provider>

}


export const UtilsDB = () => {
  return useContext(UtilitiesContext);
};