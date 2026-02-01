import { createContext, useContext } from "react";

<<<<<<< HEAD
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
        required: false,
      },
      lastName: {
        title: "Last name",
        type: "text",
        required: true,
      },
      suffix: {
        title: "Suffix",
        type: "text",
        required: false,
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
        required: false,
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
        required: false,
      },
      discord: {
        title: "Discord",
        type: "text",
        required: false,
      },
      facebook: {
        title: "Facebook",
        type: "text",
        required: false,
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
        required: false,
      },
      nonup: {
        title: "NONUP",
        type: "text",
        error: "Must not be an empty value.",
        required: false,
      },
      priorities: {
        title: "Priorities",
        type: "text",
        required: false,
      },
      concerns: {
        acad: {
          title: "Academics",
          type: "text",
          required: false,
        },
        health: {
          title: "Health",
          type: "text",
          required: false,
        },
        personal: {
          title: "Personal",
          type: "text",
          required: false,
        },
        other: {
          title: "Others",
          type: "text",
          required: false,
        },
      },
    },
    // commitments
    assessment: {
      activePerformance: {
        meta: {
          required: true,
        },
        task: {
          title: "Task performance",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        events: {
          title: "Event participation",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        meetings: {
          title: "Meeting attendance",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        assembly: {
          title: "Assembly attendance",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
      },
      elaboration: {
        title: "Elaboration",
        type: "text",
        required: true,
      },
      projects: {
        title: "Project involvement",
        question: "Which projects have you been involved in this semester?",
        type: "checkbox",
        error: "Must select atleast one option.",
        required: true,
      },
      projectPerformance: {
        meta: {
          required: true,
        },
        time: {
          title: "Time commitment",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        task: {
          title: "Task performance",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        communication: {
          title: "Communication",
          type: "radio",
          error: "Must select one option.",
          required: true,
        },
        meetings: {
          title: "Meeting attendance",
          type: "radio",
          error: "Must select one option.",
        },
      },
      best: {
        title: "Best experience",
        type: "text",
        required: true,
      },
      improve: {
        title: "Areas for improvement",
        type: "text",
        required: true,
      },
      vision: {
        title: "Vision for future involvement",
        type: "text",
        required: true,
      },
      committee: {
        lastSem: {
          title: "Committee involvement last semester",
          type: "text",
          required: true,
        },
        improvement: {
          title: "Committee involvement improvement",
          type: "text",
          required: true,
        },
        feedback: {
          title: "Committee feedback",
          type: "text",
          required: true,
        },
      },
    },
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
      events: {
        eap: {
          title: "Easy as Py",
          type: "radio",
          error: "Must select an option",
          required: true,
        },
        algolympics: {
          title: "Algolympics",
          type: "radio",
          error: "Must select an option",
          required: true,
        },
        webdev: {
          title: "Web development",
          type: "radio",
          error: "Must select an option",
          required: true,
        },
        clouddev: {
          title: "Cloud development",
          type: "radio",
          error: "Must select an option",
          required: true,
        },
        operations: {
          title: "Operations Committee",
          type: "radio",
          error: "Must select an option",
          required: true,
        },
        teachme: {
          choices: {
            title: "Choices",
            type: "checkbox",
            error: "Must select atleast (1) option",
            required: true,
          },
          enthusiast: {
            title: "Enthusiast",
            type: "text",
            error: "",
            required: false,
          },
          future: {
            title: "Future",
            type: "text",
            error: "",
            required: false,
          },
        },
      },
      committee: {
        logistics: {
          title: "Logistics",
          download: {
            title: "",
            type: "text",
            required: true,
          },
          upload: {
            title: "",
            type: "text",
            required: true,
          },
          gadgets: {
            title: "",
            type: "checkbox",
            error: "Must select atleast one option",
            required: true,
          },
        },
        publicRelations: {
          title: "Public Relations",
          partnership: {
            id: "partnership",
            title: "Computing related questions",
            required: true,
            type: "checkbox",
          },
          posts: {
            id: "posts",
            type: "radio",
            required: true,
          },
        },
        publicity: {
          title: "Publicity",
          picture: {
            type: "file",
            required: false,
          },
          birthday: {
            type: "radio",
            required: true,
          },
        },
        marketing: {
          title: "Marketing",
          type: "checkbox",
          infoDisclose: {
            title: "Information disclosure consent",
            type: "radio",
            id: "infoDisclose",
            error: "This field is required.",
            required: true,
          },
          resume: {
            title: "Resume/CV",
            type: "file",
            id: "resume",
            error: "This field is required.",
            required: false,
          },
          companyf2f: {
            title: "Company face-to-face",
            type: "radio",
            id: "companyf2f",
            error: "This field is required.",
            required: true,
          },
        },
        records: {
          title: "Records",
          automaton: {
            title: "",
            type: "radio",
            error: "Must select one option.",
            required: true,
          },
          form5: {
            title: "",
            type: "file",
            error: "Must upload a file.",
            required: false,
          },
          upid: {
            title: "",
            type: "file",
            error: "Must upload a file.",
            required: false,
          },
        },
        membership: {
          title: "Membership",
          buddy: {
            title: "Buddy",
            type: "radio",
            error: "This field is required.",
            required: true,
          },
          tambay: {
            title: "Tambay",
            type: "text",
            error: "This field is required.",
            required: true,
          },
          acmeets: {
            title: "ACMeets",
            type: "text",
            error: "This field is required.",
            required: true,
          },
          sportsfests: {
            title: "Sportsfests",
            type: "radio",
            error: "This field is required.",
            required: true,
          },
          facetoface: {
            title: "Face to face",
            answer: {
              type: "radio",
              error: "This field is required",
              required: true,
            },
            comments: {
              type: "text",
              error: "This field is required",
              required: true,
            },
          },
          gpu: {
            title: "GPU",
            type: "radio",
            error: "This field is required",
            required: true,
          },
          skill: {
            title: "",
            type: "text",
            required: true,
          },
          games: {
            title: "",
            type: "text",
            required: true,
          },
        },
        education: {
          title: "Education",
          academicLoad: {
            type: "text",
            required: true,
          },
          pendingClasses: {
            type: "text",
            required: true,
          },
          expectedClasses: {
            type: "text",
            required: true,
          },
        },
      },
    },
    payment: {
      qr: {
        required: false,
      },
    },
  };

  const onBorderError = (key, state) =>
    state?.[key]?.status === State.ERROR ? "text-field-error" : "text-field";

  const handleState = (state, key, value, path, ref = null) => {
    const item = path?.split(".").reduce((acc, key) => acc?.[key], decoderMap);
    if (ref === "") {
      return { status: State.EMPTY, error: "Must be nonempty value." };
    } else if (ref) {
      return { status: State.VALID, error: "" };
    }

    if (!value || value.length <= 0) {
      return { status: State.EMPTY, error: "This field is required." };
    }
    if (item?.pattern && !item.pattern.test(value)) {
      return { status: State.ERROR, error: item.error };
    }
    return { status: State.VALID, error: "" };
  };

  const validateForm = (form, subpath) => {
    let complete = true;
    const state = subpath
      .split(".")
      .reduce((acc, key) => acc?.[key], decoderMap);
    const values = subpath
      .split(".")
      .reduce((acc, key) => acc?.[key], form.values);

    const validateField = (key, value, fieldSchema, path) => {
      if (!fieldSchema.required) return;
      // console.log(key, value, fieldSchema, path)
      const result = handleState(form, key, value, path);
      if (result.status !== State.VALID) complete = false;
      if (result.status === State.EMPTY) result.status = State.ERROR;
      form.dispatch({ type: "SUBMIT", path, result });
    };

    Object.entries(state).forEach(([key, item]) => {
      if (key === "title") return; // skip metadata

      if ("required" in item) {
        // leaf field
        validateField(key, values?.[key], item, `${subpath}.${key}`);
      } else {
        // nested group — recurse one level
        Object.entries(item).forEach(([childKey, childItem]) => {
          if (key === "title" || typeof childItem !== "object") return;
          if ("required" in childItem) {
            validateField(
              childKey,
              values?.[key]?.[childKey],
              childItem,
              `${subpath}.${key}.${childKey}`,
            );
          }
        });
      }
    });
    console.log(complete);

    return complete;
  };
  const State = Object.freeze({
    EMPTY: "EMPTY",
    VALID: "VALID",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
  });

  const validationUtils = {
    onBorderError,
    validateForm,
    handleState,
    State,
  };

  return (
    <UtilitiesContext.Provider value={{ decoderMap, validationUtils }}>
      {children}
    </UtilitiesContext.Provider>
  );
};

export const UtilsDB = () => useContext(UtilitiesContext);
=======
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
>>>>>>> 65dd3a9 (feat: initial form validation)
