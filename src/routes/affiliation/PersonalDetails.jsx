import "../../styles/components.css";
<<<<<<< HEAD
=======
import { use, useEffect, useReducer } from "react";
>>>>>>> 65dd3a9 (feat: initial form validation)
import { useOutletContext, useNavigate } from "react-router";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import Field from "../../components/Field.jsx";
import Header from "../../components/Header.jsx";
<<<<<<< HEAD
import Footer from "../../components/Footer.jsx";
import DisplayError from "../../components/DisplayError.jsx";
import { useEffect } from "react";

export default function PersonalDetailsx() {
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page, setPage } =
    useOutletContext();
=======

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

>>>>>>> 65dd3a9 (feat: initial form validation)
  const Navigate = useNavigate();
  const state = form.validationState?.personalInfo;

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
<<<<<<< HEAD
    console.log(e.target);
    const newValue = type === "checkbox" ? checked : value;
    form.updateField({
      path: `personalInfo.${name}`,
      value: newValue,
      type,
    });
    form.dispatch({
      type: "CHANGE",
      path: `personalInfo.${name}`,
      result: validationUtils.handleState(
        state,
        name,
        newValue,
        `personalInfo.${name}`,
      ),
    });
  };

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    console.log(form.validationState);
  }, [form.validationState]);
  useEffect(() => {
    console.log(form.values);
  }, [form.values]);
=======

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
>>>>>>> 65dd3a9 (feat: initial form validation)

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
<<<<<<< HEAD
                className={validationUtils.onBorderError("firstName", state)}
=======
                className={onBorderError("firstName")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.firstName || ""}
                onChange={handleChange}
                placeholder="Jammond"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="firstName"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("firstName")}
            </Field>

            <Field label="Middle Name">
              <input
                type="text"
                name="middleName"
<<<<<<< HEAD
                className={validationUtils.onBorderError("middleName", state)}
=======
                className={onBorderError("middleName")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.middleName || ""}
                onChange={handleChange}
                placeholder="Diamondback"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="middleName"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("middleName")}
            </Field>

            <Field label="Last Name">
              <input
                type="text"
                name="lastName"
<<<<<<< HEAD
                className={validationUtils.onBorderError("lastName", state)}
=======
                className={onBorderError("lastName")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.lastName || ""}
                onChange={handleChange}
                placeholder="Terrapin"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="lastName"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
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
<<<<<<< HEAD
              className={validationUtils.onBorderError("currentAddress", state)}
=======
              className={onBorderError("currentAddress")}
>>>>>>> 65dd3a9 (feat: initial form validation)
              value={localStorage?.personalInfo?.currentAddress || ""}
              onChange={handleChange}
              placeholder="1234 Elm St., Barangay, City, Province, ZIP"
              required
<<<<<<< HEAD
            />
            <DisplayError
              id="currentAddress"
              state={state}
              State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
            />
            {displayError("currentAddress")}
          </Field>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Gender">
              <input
                type="text"
                name="gender"
<<<<<<< HEAD
                className={validationUtils.onBorderError("gender", state)}
=======
                className={onBorderError("gender")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.gender || ""}
                onChange={handleChange}
                placeholder="Male/Female/Other"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="gender"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("gender")}
            </Field>

            <Field label="Birthday">
              <input
                type="date"
                name="birthday"
<<<<<<< HEAD
                className={validationUtils.onBorderError("birthday", state)}
                value={localStorage?.personalInfo?.birthday || ""}
                onChange={handleChange}
                required
              />
              <DisplayError
                id="birthday"
                state={state}
                State={validationUtils.State}
=======
                className={onBorderError("birthday")}
                value={localStorage?.personalInfo?.birthday || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
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
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "studentNumber",
                  state,
                )}
=======
                className={onBorderError("studentNumber")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.studentNumber || ""}
                onChange={handleChange}
                placeholder="20XX-XXXXX"
                required
              />
<<<<<<< HEAD
              <DisplayError
                id="studentNumber"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="High School Attended">
              <input
                name="highschool"
                className={validationUtils.onBorderError("highschool", state)}
                value={localStorage?.personalInfo?.highschool || ""}
                onChange={handleChange}
                placeholder="University of Santo Tomas Highschool"
              />
              <DisplayError
                id="highschool"
                state={state}
                State={validationUtils.State}
              />
=======
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
>>>>>>> 65dd3a9 (feat: initial form validation)
            </Field>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <Field label="Current Year">
              <input
                type="text"
                name="year"
<<<<<<< HEAD
                className={validationUtils.onBorderError("year", state)}
=======
                className={onBorderError("year")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.year || ""}
                onChange={handleChange}
                placeholder="First Year"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="year"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("year")}
            </Field>

            <Field label="Expected Grad Year">
              <input
                type="text"
                name="expectedGradYear"
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "expectedGradYear",
                  state,
                )}
=======
                className={onBorderError("expectedGradYear")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.expectedGradYear || ""}
                onChange={handleChange}
                placeholder="20XX"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="expectedGradYear"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("expectedGradYear")}
            </Field>

            <Field label="College">
              <input
                type="text"
                name="college"
<<<<<<< HEAD
                className={validationUtils.onBorderError("college", state)}
=======
                className={onBorderError("college")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.college || ""}
                onChange={handleChange}
                placeholder="College of Engineering"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="college"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("college")}
            </Field>

            <Field label="Degree Program">
              <input
                type="text"
                name="degreeProgram"
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "degreeProgram",
                  state,
                )}
=======
                className={onBorderError("degreeProgram")}
>>>>>>> 65dd3a9 (feat: initial form validation)
                value={localStorage?.personalInfo?.degreeProgram || ""}
                onChange={handleChange}
                placeholder="BS/BA"
                required
<<<<<<< HEAD
              />
              <DisplayError
                id="degreeProgram"
                state={state}
                State={validationUtils.State}
=======
>>>>>>> 65dd3a9 (feat: initial form validation)
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
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "primaryEmail",
                  state,
                )}
                value={localStorage?.personalInfo?.primaryEmail || ""}
                onChange={handleChange}
                placeholder="jammond@gmail.com"
                required
              />
              <DisplayError
                id="primaryEmail"
                state={state}
                State={validationUtils.State}
=======
                placeholder="jammond@gmail.com"
                className={onBorderError("primaryEmail")}
                value={localStorage?.personalInfo?.primaryEmail || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("primaryEmail")}
            </Field>

            <Field label="UP Email">
              <input
                type="email"
                name="upEmail"
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "upEmail",
                  state,
                )}
                value={localStorage?.personalInfo?.upEmail || ""}
                onChange={handleChange}
                placeholder="jammond@up.edu.ph"
                required
              />
              <DisplayError
                id="upEmail"
                state={state}
                State={validationUtils.State}
=======
                placeholder="jammond@up.edu.ph"
                className={onBorderError("upEmail")}
                value={localStorage?.personalInfo?.upEmail || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("upEmail")}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Mobile Number">
              <input
<<<<<<< HEAD
                type="tel"
                name="phone"
                className={validationUtils.onBorderError("phone", state)}
                value={localStorage?.personalInfo?.phone || ""}
                onChange={handleChange}
                placeholder="09XX XXX XXXX"
                required
              />
              <DisplayError
                id="phone"
                state={state}
                State={validationUtils.State}
=======
                type="text"
                name="phone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("phone")}
                value={localStorage?.personalInfo?.phone || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("phone")}
            </Field>

            <Field label="Telephone">
              <input
<<<<<<< HEAD
                type="tel"
                name="telephone"
                className="text-field"
                value={localStorage?.personalInfo?.telephone || ""}
                onChange={handleChange}
                placeholder="09XX XXX XXXX"
=======
                type="text"
                name="telephone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("telephone")}
                value={localStorage?.personalInfo?.telephone || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
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
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "emergencyName",
                  state,
                )}
                value={localStorage?.personalInfo?.emergencyName || ""}
                onChange={handleChange}
                placeholder="Jammond's Mom"
                required
              />
              <DisplayError
                id="emergencyName"
                state={state}
                State={validationUtils.State}
=======
                placeholder="Jammond's Mom"
                className={onBorderError("emergencyName")}
                value={localStorage?.personalInfo?.emergencyName || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("emergencyName")}
            </Field>

            <Field label="Relationship">
              <input
                type="text"
                name="emergencyRelation"
<<<<<<< HEAD
                className={validationUtils.onBorderError(
                  "emergencyRelation",
                  state,
                )}
                value={localStorage?.personalInfo?.emergencyRelation || ""}
                onChange={handleChange}
                placeholder="Mother"
                required
              />
              <DisplayError
                id="emergencyRelation"
                state={state}
                State={validationUtils.State}
=======
                placeholder="Mother"
                className={onBorderError("emergencyRelation")}
                value={localStorage?.personalInfo?.emergencyRelation || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
              />
              {displayError("emergencyRelation")}
            </Field>

            <Field label="Contact Number">
              <input
<<<<<<< HEAD
                type="tel"
                name="emergencyPhone"
                className={validationUtils.onBorderError(
                  "emergencyPhone",
                  state,
                )}
                value={localStorage?.personalInfo?.emergencyPhone || ""}
                onChange={handleChange}
                placeholder="09XX XXX XXXX"
                required
              />
              <DisplayError
                id="emergencyPhone"
                state={state}
                State={validationUtils.State}
=======
                type="text"
                name="emergencyPhone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("emergencyPhone")}
                value={localStorage?.personalInfo?.emergencyPhone || ""}
                onChange={handleChange}
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
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
<<<<<<< HEAD
                placeholder="INTJ"
=======
                required
>>>>>>> 65dd3a9 (feat: initial form validation)
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
                placeholder="#jammond"
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
                placeholder="https://www.facebook.com/jammond/"
              />
            </Field>
          </div>
        </section>

<<<<<<< HEAD
        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          details={[form, "personalInfo"]}
          nextPage="commitments"
        />
=======
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
>>>>>>> 65dd3a9 (feat: initial form validation)
      </div>
    </div>
  );
}
