import { createContext, useContext } from "react";

const UtilitiesContext = createContext();
export const UtilitiesContextProvider = ({ children }) => {
  const decoderMap = {
    // personalInfo
    firstName: {
      title: "First name",
      type: "text",
    },
    middleName: {
      title: "Middle name",
      type: "text",
    },
    lastName: {
      title: "Last name",
      type: "text",
    },
    suffix: {
      title: "Suffix",
      type: "text",
    },
    currentAddress: {
      title: "Current address",
      type: "text",
    },
    birthday: {
      title: "Birthday",
      type: "date",
    },
    gender: {
      title: "Gender",
      type: "text",
    },
    studentNumber: {
      title: "Student number",
      type: "text",
    },
    year: {
      title: "Year",
      type: "text",
    },
    degreeProgram: {
      title: "Degree program",
      type: "text",
    },
    college: {
      title: "College",
      type: "text",
    },
    expectedGradYear: {
      title: "Expected graduation year",
      type: "text",
    },
    highschool: {
      title: "Highschool",
      type: "text",
    },
    primaryEmail: {
      title: "Primary email",
      type: "email",
    },
    upEmail: {
      title: "UP email",
      type: "email",
    },
    phone: {
      title: "Phone number",
      type: "tel",
    },
    telephone: {
      title: "Telephone",
      type: "tel",
    },
    emergencyName: {
      title: "Emergency contact name",
      type: "text",
    },
    emergencyRelation: {
      title: "Emergency contact relation",
      type: "text",
    },
    emergencyPhone: {
      title: "Emergency contact phone",
      type: "tel",
    },
    mbti: {
      title: "MBTI",
      type: "text",
    },
    discord: {
      title: "Discord",
      type: "text",
    },
    facebook: {
      title: "Facebook",
      type: "text",
    },

    // committees
    logistics: {
      title: "Logistics",
      type: "checkbox",
    },
    publicRelations: {
      title: "Public Relations",
      type: "checkbox",
    },
    publicity: {
      title: "Publicity",
      type: "checkbox",
    },
    marketing: {
      title: "Marketing",
      type: "checkbox",
    },
    records: {
      title: "Records",
      type: "checkbox",
    },
    membership: {
      title: "Membership",
      type: "checkbox",
    },
    education: {
      title: "Education",
      type: "checkbox",
    },
  };

  return (
    <UtilitiesContext.Provider value={{ decoderMap }}>
      {children}
    </UtilitiesContext.Provider>
  );
};

export const UtilsDB = () => {
  return useContext(UtilitiesContext);
};
