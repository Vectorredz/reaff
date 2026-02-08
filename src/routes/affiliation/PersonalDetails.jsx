import "../../styles/components.css";
import { useEffect, useReducer } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import Field from "../../components/Field.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import DisplayError from "../../components/DisplayError.jsx";
export default function PersonalDetails() {
  const { decoderMap, State } = UtilsDB();
  const {
    formData,
    setFormData,
    localStorage,
    setLocalStorage,
    clearLocalStorage,
    page,
  } = useOutletContext();
  const Navigate = useNavigate();

  // must be unique for each form
  const handleState = (key) => {
    let value = formData?.personalInfo[key];
    let item = decoderMap.personalInfo[key];
    if (!value) {
      return { status: State.EMPTY, error: "This field is required." };
    } else if (item.pattern && !item.pattern.test(value)) {
      return { status: State.ERROR, error: item.error };
    } else {
      return { status: State.VALID, error: "" };
    }
  };

  function validationReducer(state, action) {
    const { type, name } = action;
    switch (type) {
      case "CHANGE":
        return {
          ...state,
          [name]: {
            ...state[name],
            status: handleState(name).status,
            error: handleState(name).error,
          },
        };
      case "SUBMIT":
        return Object.fromEntries(
          Object.entries(state).map(([key, val]) => [
            key,
            val.status === State.VALID || val.status === State.SUCCESS
              ? { status: State.SUCCESS, error: "" }
              : { status: State.ERROR, error: handleState(key)?.error },
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

  const onBorderError = (elem) =>
    state[elem].status === State.ERROR
      ? "text-field border-red-500"
      : "text-field";

  useEffect(() => {
    console.log(state);
  }, [state]);

  const validateForm = () => {
    const complete = Object.entries(decoderMap.personalInfo)
      .filter((key) => key[1].required)
      .every(
        (key) =>
          state[key[0]].status === State.VALID ||
          state[key[0]].status === State.SUCCESS,
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
      input: type,
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
              <DisplayError
                id="firstName"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="middleName"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="lastName"
                state={state}
                State={State}
              />
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
            <DisplayError
                id="currentAddress"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="gender"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="birthday"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="studentNumber"
                state={state}
                State={State}
              />
            </Field>
            <Field label="High School Attended">
              <input
                name="highschool"
                placeholder="University of Santo Tomas Highschool"
                className={onBorderError("highschool")}
                value={localStorage?.personalInfo?.highschool || ""}
                onChange={handleChange}
              />
              <DisplayError
                id="highschool"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="year"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="expectedGradYear"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="college"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="degreeProgram"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="primaryEmail"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="upEmail"
                state={state}
                State={State}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Mobile Number">
              <input
                type="tel"
                name="phone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("phone")}
                value={localStorage?.personalInfo?.phone || ""}
                onChange={handleChange}
                required
              />
              <DisplayError
                id="phone"
                state={state}
                State={State}
              />
            </Field>

            <Field label="Telephone">
              <input
                type="tel"
                name="telephone"
                placeholder="09XX XXX XXXX"
                className="text-field"
                value={localStorage?.personalInfo?.telephone || ""}
                onChange={handleChange}
              />
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
              <DisplayError
                id="emergencyName"
                state={state}
                State={State}
              />
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
              <DisplayError
                id="emergencyRelation"
                state={state}
                State={State}
              />
            </Field>

            <Field label="Contact Number">
              <input
                type="tel"
                name="emergencyPhone"
                placeholder="09XX XXX XXXX"
                className={onBorderError("emergencyPhone")}
                value={localStorage?.personalInfo?.emergencyPhone || ""}
                onChange={handleChange}
                required
              />
              <DisplayError
                id="emergencyPhone"
                state={state}
                State={State}
              />
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
        <Footer
          validateForm={validateForm}
          clearLocalStorage={clearLocalStorage}
          Navigate={Navigate}
          nextPage="commitments"
        />
      </div>
    </div>
  );
}
