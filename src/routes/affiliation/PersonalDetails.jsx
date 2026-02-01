import "../../styles/components.css";
import { use, useEffect, useReducer } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import Field from "../../components/Field.jsx";
import Header from "../../components/Header.jsx";

const State = Object.freeze({
  EMPTY: "EMPTY",
  VALID: "VALID",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

// bruteforce
const Required = [
  "firstName",
  "middleName",
  "lastName",
  "currentAddress",
  "gender",
  "birthday",
  "studentNumber",
  "year",
  "expectedGradYear",
  "college",
  "degreeProgram",
  "primaryEmail",
  "upEmail",
  "phone",
  "telephone",
  "emergencyName",
  "emergencyRelation",
  "emergencyPhone",
];

export default function PersonalDetails() {
  const { decoderMap } = UtilsDB();
  const {
    formData,
    setFormData,
    localStorage,
    setLocalStorage,
    clearLocalStorage,
    page,
  } = useOutletContext();

  function validationReducer(state, action) {
    const { type, name, value, input } = action;
    let error = "";
    if (input === "email") {
      if (value === "") {
        error = "This field is required.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Invalid email address.";
      } else {
        error = "";
      }
    } else {
      if (value === "") {
        error = "This field is required.";
      }
    }
    switch (type) {
      case "CHANGE":
        return {
          ...state,
          [name]: {
            ...state[name],
            status: value === "" ? State.EMPTY : State.VALID,
            error: error,
          },
        };
      case "SUBMIT":
        return Object.fromEntries(
          Object.entries(state).map(([key, val]) => [
            key,
            val.status === State.EMPTY || val.status === State.ERROR
              ? { status: State.ERROR, error: "Required" }
              : { status: State.SUCCESS, error: "" },
          ]),
        );

      default:
        return state;
    }
  }

  const initialValidationState = Object.fromEntries(
    Object.keys(formData?.personalInfo ?? {}).map((key) => [
      key,
      {
        status: formData?.personalInfo[key] ? State.VALID : State.EMPTY,
        error: "",
      },
    ]),
  );

  const [state, dispatch] = useReducer(
    validationReducer,
    initialValidationState,
  );

  const Navigate = useNavigate();

  const onBorderError = (elem) =>
    state[elem].status === State.ERROR
      ? "text-field border-red-600"
      : "text-field";

  const displayError = (elem) =>
    state[elem].status === State.ERROR && (
      <span className="text-xs text-red-500">
        {`${decoderMap[elem]} is required`}
      </span>
    );

  useEffect(() => {
    console.log(state);
  }, [state]);

  const validateForm = () => {
    const complete = Required.every(
      (key) =>
        state[key].status === State.VALID ||
        state[key].status === State.SUCCESS,
    );
    dispatch({ type: "SUBMIT" });
    console.log(complete);
    return complete;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: type === "checkbox" ? checked : value,
      },
    }));

    setLocalStorage((prev = formData) => ({
      ...(prev ?? formData),
      personalInfo: {
        ...(prev.personalInfo ?? formData?.personalInfo),
        [name]: type === "checkbox" ? checked : value,
      },
    }));

    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  };

  return (
    <div className="form-frame">
      <div className="form-card">
        <Header page={page} title={"Personal Information"} />

        <section className="form-section">
          <h2 className="section-title">Personal Information</h2>

          <div className="grid grid-cols-4 gap-4">
            <Field label="First Name">
              <input
                type="text"
                name="firstName"
                className={onBorderError("firstName")}
                value={localStorage?.personalInfo?.firstName || ""}
                onChange={handleChange}
                placeholder="Jammond"
                required
              />
              {displayError("firstName")}
            </Field>

            <Field label="Middle Name">
              <input
                type="text"
                name="middleName"
                className={onBorderError("middleName")}
                value={localStorage?.personalInfo?.middleName || ""}
                onChange={handleChange}
                placeholder="Diamondback"
                required
              />
              {displayError("middleName")}
            </Field>

            <Field label="Last Name">
              <input
                type="text"
                name="lastName"
                className={onBorderError("lastName")}
                value={localStorage?.personalInfo?.lastName || ""}
                onChange={handleChange}
                placeholder="Terrapin"
                required
              />
              {displayError("lastName")}
            </Field>

            <Field label="Suffix">
              <input
                type="text"
                name="suffix"
                className="suffix-field"
                value={localStorage?.personalInfo?.suffix || ""}
                onChange={handleChange}
                placeholder="Jr."
              />
            </Field>
          </div>

          <Field label="Current Address" className="mt-4">
            <input
              type="text"
              name="currentAddress"
              className={onBorderError("currentAddress")}
              value={localStorage?.personalInfo?.currentAddress || ""}
              onChange={handleChange}
              placeholder="1234 Elm St., Barangay, City, Province, ZIP"
              required
            />
            {displayError("currentAddress")}
          </Field>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Gender">
              <input
                type="text"
                name="gender"
                className={onBorderError("gender")}
                value={localStorage?.personalInfo?.gender || ""}
                onChange={handleChange}
                placeholder="Male/Female/Other"
                required
              />
              {displayError("gender")}
            </Field>

            <Field label="Birthday">
              <input
                type="date"
                name="birthday"
                className={onBorderError("birthday")}
                value={localStorage?.personalInfo?.birthday || ""}
                onChange={handleChange}
                required
              />
              {displayError("birthday")}
            </Field>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Student Information</h2>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Student Number">
              <input
                type="text"
                name="studentNumber"
                className={onBorderError("studentNumber")}
                value={localStorage?.personalInfo?.studentNumber || ""}
                onChange={handleChange}
                placeholder="20XX-XXXXX"
                required
              />
              {displayError("studentNumber")}
            </Field>
            <Field label="High School Attended">
              <input
                name="highschool"
                placeholder="University of Santo Tomas Highschool"
                className={onBorderError("highschool")}
                value={localStorage?.personalInfo?.highschool || ""}
                onChange={handleChange}
              />
              {displayError("highschool")}
            </Field>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <Field label="Current Year">
              <input
                type="text"
                name="year"
                className={onBorderError("year")}
                value={localStorage?.personalInfo?.year || ""}
                onChange={handleChange}
                placeholder="First Year"
                required
              />
              {displayError("year")}
            </Field>

            <Field label="Expected Grad Year">
              <input
                type="text"
                name="expectedGradYear"
                className={onBorderError("expectedGradYear")}
                value={localStorage?.personalInfo?.expectedGradYear || ""}
                onChange={handleChange}
                placeholder="20XX"
                required
              />
              {displayError("expectedGradYear")}
            </Field>

            <Field label="College">
              <input
                type="text"
                name="college"
                className={onBorderError("college")}
                value={localStorage?.personalInfo?.college || ""}
                onChange={handleChange}
                placeholder="College of Engineering"
                required
              />
              {displayError("college")}
            </Field>

            <Field label="Degree Program">
              <input
                type="text"
                name="degreeProgram"
                className={onBorderError("degreeProgram")}
                value={localStorage?.personalInfo?.degreeProgram || ""}
                onChange={handleChange}
                placeholder="BS/BA"
                required
              />
              {displayError("degreeProgram")}
            </Field>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Contact Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary Email">
              <input
                type="email"
                name="primaryEmail"
                placeholder="jammond@gmail.com"
                className={onBorderError("primaryEmail")}
                value={localStorage?.personalInfo?.primaryEmail || ""}
                onChange={handleChange}
                required
              />
              {displayError("primaryEmail")}
            </Field>

            <Field label="UP Email">
              <input
                type="email"
                name="upEmail"
                placeholder="jammond@up.edu.ph"
                className={onBorderError("upEmail")}
                value={localStorage?.personalInfo?.upEmail || ""}
                onChange={handleChange}
                required
              />
              {displayError("upEmail")}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Mobile Number">
              <input
                type="text"
                name="phone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("phone")}
                value={localStorage?.personalInfo?.phone || ""}
                onChange={handleChange}
                required
              />
              {displayError("phone")}
            </Field>

            <Field label="Telephone">
              <input
                type="text"
                name="telephone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("telephone")}
                value={localStorage?.personalInfo?.telephone || ""}
                onChange={handleChange}
                required
              />
              {displayError("telephone")}
            </Field>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Emergency Contact</h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Contact Person">
              <input
                type="text"
                name="emergencyName"
                placeholder="Jammond's Mom"
                className={onBorderError("emergencyName")}
                value={localStorage?.personalInfo?.emergencyName || ""}
                onChange={handleChange}
                required
              />
              {displayError("emergencyName")}
            </Field>

            <Field label="Relationship">
              <input
                type="text"
                name="emergencyRelation"
                placeholder="Mother"
                className={onBorderError("emergencyRelation")}
                value={localStorage?.personalInfo?.emergencyRelation || ""}
                onChange={handleChange}
                required
              />
              {displayError("emergencyRelation")}
            </Field>

            <Field label="Contact Number">
              <input
                type="text"
                name="emergencyPhone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("emergencyPhone")}
                value={localStorage?.personalInfo?.emergencyPhone || ""}
                onChange={handleChange}
                required
              />
              {displayError("emergencyPhone")}
            </Field>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Other Information</h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="MBTI">
              <input
                type="text"
                name="mbti"
                placeholder="INTJ"
                className="text-field"
                value={localStorage?.personalInfo?.mbti || ""}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Discord Tag">
              <input
                type="text"
                name="discord"
                className="text-field"
                placeholder="#jammond"
                value={localStorage?.personalInfo?.discord || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Facebook Profile">
              <input
                type="text"
                name="facebook"
                className="text-field"
                placeholder="https://www.facebook.com/jammond/"
                value={localStorage?.personalInfo?.facebook || ""}
                onChange={handleChange}
              />
            </Field>
          </div>
        </section>

        <div className="flex justify-between items-center pt-6 border-t">
          <span className="text-sm text-gray-500">
            Please review before proceeding
          </span>

          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                // Navigate("commitments");
                console.log("test");
              }
            }}
          >
            Next
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={(e) => {
              e.preventDefault();
              clearLocalStorage();
              window.location.reload();
            }}
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
}
