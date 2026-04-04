import "../../styles/components.css";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import Field from "../../components/Field.jsx";
import Header from "../../components/Header.jsx";
import { UserContext } from "../../contexts/FormContext.jsx";
export default function CreateAccount() {
  const { setEmail, setPassword, page, setPage, } =
    useOutletContext();
  const { localStorage } = UserContext();
  useEffect(() => setPage(6), []);

  return (
    <div className="form-frame">
      <div className="form">
        <Header page={page} title={"Create Account"} />

        <section className="form-section">
          <div>
            <h2 className="section-title">Create Your Account</h2>
            <p className="description-text">
              Almost done! Create your UP ACM reaff account to submit your form.
            </p>
          </div>

          {/* info card */}
          <div className="grid grid-cols-2 p-4 rounded-xl gap-3 bg-blue-50 border border-blue-100">
            <div>
              <p className="notes-text">Primary email</p>
              <p className="text-sm font-medium text-blue-700">
                {localStorage?.personalInfo?.primaryEmail?.value || (
                  <span className="text-red-400">Not filled in yet</span>
                )}
              </p>
            </div>
            <div>
              <p className="notes-text">UP email</p>
              <p className="text-sm font-medium text-blue-700">
                {localStorage?.personalInfo?.upEmail?.value || (
                  <span className="text-red-400">Not filled in yet </span>
                )}
              </p>
            </div>
          </div>

          <div className="question-grid">
            <Field label="Email">
              <select
                className="text-field"
                defaultValue=""
                onChange={(e) => setEmail(e.target.value)}
              >
                <option value="" disabled>
                  Select your email
                </option>
                {localStorage?.personalInfo?.primaryEmail?.value && (
                  <option value={localStorage.personalInfo.primaryEmail?.value}>
                    {localStorage.personalInfo.primaryEmail?.value} (Primary)
                  </option>
                )}
                {localStorage?.personalInfo?.upEmail?.value && (
                  <option value={localStorage.personalInfo.upEmail?.value}>
                    {localStorage.personalInfo.upEmail?.value} (UP Email)
                  </option>
                )}
              </select>
            </Field>

            <Field label="Password">
              <input
                className="text-field"
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </div>
        </section>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          
          
          <p className="description-text">
            Please review your form before submitting.
          </p>
          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
