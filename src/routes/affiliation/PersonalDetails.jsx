import "../../styles/components.css";
import { useOutletContext, useNavigate } from "react-router";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import Field from "../../components/Field.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import DisplayError from "../../components/DisplayError.jsx";
import { useEffect } from "react";

export default function PersonalDetailsx() {
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page, setPage } =
    useOutletContext();
  const Navigate = useNavigate();
  const state = form.validationState?.personalInfo;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
                className={validationUtils.onBorderError("firstName", state)}
                value={localStorage?.personalInfo?.firstName || ""}
                onChange={handleChange}
                placeholder="Jammond"
                required
              />
              <DisplayError
                id="firstName"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="Middle Name">
              <input
                type="text"
                name="middleName"
                className={validationUtils.onBorderError("middleName", state)}
                value={localStorage?.personalInfo?.middleName || ""}
                onChange={handleChange}
                placeholder="Diamondback"
                required
              />
              <DisplayError
                id="middleName"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="Last Name">
              <input
                type="text"
                name="lastName"
                className={validationUtils.onBorderError("lastName", state)}
                value={localStorage?.personalInfo?.lastName || ""}
                onChange={handleChange}
                placeholder="Terrapin"
                required
              />
              <DisplayError
                id="lastName"
                state={state}
                State={validationUtils.State}
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
              className={validationUtils.onBorderError("currentAddress", state)}
              value={localStorage?.personalInfo?.currentAddress || ""}
              onChange={handleChange}
              placeholder="1234 Elm St., Barangay, City, Province, ZIP"
              required
            />
            <DisplayError
              id="currentAddress"
              state={state}
              State={validationUtils.State}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Gender">
              <input
                type="text"
                name="gender"
                className={validationUtils.onBorderError("gender", state)}
                value={localStorage?.personalInfo?.gender || ""}
                onChange={handleChange}
                placeholder="Male/Female/Other"
                required
              />
              <DisplayError
                id="gender"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="Birthday">
              <input
                type="date"
                name="birthday"
                className={validationUtils.onBorderError("birthday", state)}
                value={localStorage?.personalInfo?.birthday || ""}
                onChange={handleChange}
                required
              />
              <DisplayError
                id="birthday"
                state={state}
                State={validationUtils.State}
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
                className={validationUtils.onBorderError(
                  "studentNumber",
                  state,
                )}
                value={localStorage?.personalInfo?.studentNumber || ""}
                onChange={handleChange}
                placeholder="20XX-XXXXX"
                required
              />
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
            </Field>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <Field label="Current Year">
              <input
                type="text"
                name="year"
                className={validationUtils.onBorderError("year", state)}
                value={localStorage?.personalInfo?.year || ""}
                onChange={handleChange}
                placeholder="First Year"
                required
              />
              <DisplayError
                id="year"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="Expected Grad Year">
              <input
                type="text"
                name="expectedGradYear"
                className={validationUtils.onBorderError(
                  "expectedGradYear",
                  state,
                )}
                value={localStorage?.personalInfo?.expectedGradYear || ""}
                onChange={handleChange}
                placeholder="20XX"
                required
              />
              <DisplayError
                id="expectedGradYear"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="College">
              <input
                type="text"
                name="college"
                className={validationUtils.onBorderError("college", state)}
                value={localStorage?.personalInfo?.college || ""}
                onChange={handleChange}
                placeholder="College of Engineering"
                required
              />
              <DisplayError
                id="college"
                state={state}
                State={validationUtils.State}
              />
            </Field>

            <Field label="Degree Program">
              <input
                type="text"
                name="degreeProgram"
                className={validationUtils.onBorderError(
                  "degreeProgram",
                  state,
                )}
                value={localStorage?.personalInfo?.degreeProgram || ""}
                onChange={handleChange}
                placeholder="BS/BA"
                required
              />
              <DisplayError
                id="degreeProgram"
                state={state}
                State={validationUtils.State}
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
              />
            </Field>

            <Field label="UP Email">
              <input
                type="email"
                name="upEmail"
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
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Mobile Number">
              <input
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
              />
            </Field>

            <Field label="Telephone">
              <input
                type="tel"
                name="telephone"
                className="text-field"
                value={localStorage?.personalInfo?.telephone || ""}
                onChange={handleChange}
                placeholder="09XX XXX XXXX"
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
              />
            </Field>

            <Field label="Relationship">
              <input
                type="text"
                name="emergencyRelation"
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
              />
            </Field>

            <Field label="Contact Number">
              <input
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
                className="text-field"
                value={localStorage?.personalInfo?.mbti || ""}
                onChange={handleChange}
                placeholder="INTJ"
              />
            </Field>

            <Field label="Discord Tag">
              <input
                type="text"
                name="discord"
                className="text-field"
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
                value={localStorage?.personalInfo?.facebook || ""}
                onChange={handleChange}
                placeholder="https://www.facebook.com/jammond/"
              />
            </Field>
          </div>
        </section>

        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          details={[form, "personalInfo"]}
          nextPage="commitments"
        />
      </div>
    </div>
  );
}
