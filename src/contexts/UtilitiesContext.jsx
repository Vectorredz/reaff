import { createContext, useContext } from "react";

const UtilitiesContext = createContext();

export const UtilitiesContextProvider = ({ children }) => {
  const decoderMap = {
    // ─── Personal Info ─────────────────────────────
    personalInfo: {
      firstName: {
        title: "First name",
        type: "text",
        required: true,
      },
      middleName: {
        title: "Middle name",
        type: "text",
      },
      lastName: {
        title: "Last name",
        type: "text",
        required: true,
      },
      suffix: {
        title: "Suffix",
        type: "text",
      },
      currentAddress: {
        title: "Current address",
        type: "text",
        required: true,
      },
      birthday: {
        title: "Birthday",
        type: "date",
        required: true,
      },
      gender: {
        title: "Gender",
        type: "text",
        required: true,
      },

      studentNumber: {
        title: "Student number",
        type: "text",
        pattern: /^[0-9]{4,}-[0-9]{5,}$/i,
        error: "Format: 20XX-XXXXX",
        required: true,
      },
      year: {
        title: "Year",
        type: "text",
        required: true,
      },
      degreeProgram: {
        title: "Degree program",
        type: "text",
        required: true,
      },
      college: {
        title: "College",
        type: "text",
        required: true,
      },
      expectedGradYear: {
        title: "Expected graduation year",
        type: "text",
        required: true,
      },
      highschool: {
        title: "Highschool",
        type: "text",
      },

      primaryEmail: {
        title: "Primary email",
        type: "email",
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        error: "Must be a valid email.",
      },
      upEmail: {
        title: "UP email",
        type: "email",
        required: true,
        pattern: /^[A-Z0-9._%+-]+@up\.edu\.ph$/i,
        error: "Must be a valid UP email.",
      },
      phone: {
        title: "Phone number",
        type: "tel",
        required: true,
        pattern: /^[0-9]{4}\s[0-9]{3}\s[0-9]{4}$/,
        error: "Format: 09XX XXX XXXX",
      },
      telephone: {
        title: "Telephone",
        type: "tel",
        pattern: /^[0-9]{4}\s[0-9]{3}\s[0-9]{4}$/,
        error: "Format: 09XX XXX XXXX",
      },

      emergencyName: {
        title: "Emergency contact name",
        type: "text",
        required: true,
      },
      emergencyRelation: {
        title: "Emergency contact relation",
        type: "text",
        required: true,
      },
      emergencyPhone: {
        title: "Emergency contact phone",
        type: "tel",
        required: true,
        pattern: /^[0-9]{4}\s[0-9]{3}\s[0-9]{4}$/,
        error: "Format: 09XX XXX XXXX",
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
    },

    commitments: {
      membership: {
        title: "Membership",
        type: "radio",
        error: "Must select one option.",
        required: true,
      },
      up: {
        title: "UP",
        type: "text",
        error: "Must not be an empty value.",
      },
      nonup: {
        title: "NONUP",
        type: "text",
        error: "Must not be an empty value.",
      },
      priorities: {
        title: "Priorities",
        type: "text",
      },
      concerns: {
        acad: {
          title: "Academics",
          type: "text",
        },
        health: {
          title: "Health",
          type: "text",
        },
        personal: {
          title: "Personal",
          type: "text",
        },
        other: {
          title: "Others",
          type: "text",
        },
      },
    },
    // commitments

    // ─── Committees ────────────────────────────────

    organization: {
      preferences: {
        committeeRank: {
          title: "Committee Rankings",
          type: "text",
          required: true,
        },
        top1: {
          title: "Top 1 preferred committee",
          reason: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
          expectation: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
        },
        top2: {
          title: "Top 2 preferred committee",
          reason: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
          expectation: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
        },
        top3: {
          title: "Top 3 preferred committee",
          reason: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
          expectation: {
            type: "text",
            error: "This is a required field.",
            required: true,
          },
        },
      },
      committee: {
        logistics: { title: "Logistics", type: "checkbox" },
        publicRelations: { title: "Public Relations", type: "checkbox" },
        publicity: { title: "Publicity", type: "checkbox" },
        marketing: { title: "Marketing", type: "checkbox" },
        records: { title: "Records", type: "checkbox" },
        membership: {
          title: "Membership",
          buddy: {
            title: "",
            type: "checkbox",
            error: "This field is required.",
          },
          acmeets: {
            title: "",
          },
        },
        education: { title: "Education", type: "checkbox" },
      },
    },
  };

  const State = Object.freeze({
    EMPTY: "EMPTY",
    VALID: "VALID",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
  });

  return (
    <UtilitiesContext.Provider value={{ decoderMap, State }}>
      {children}
    </UtilitiesContext.Provider>
  );
};

export const UtilsDB = () => useContext(UtilitiesContext);
