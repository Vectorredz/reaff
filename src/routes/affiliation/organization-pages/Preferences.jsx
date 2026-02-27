import { useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import { UtilsDB } from "../../../contexts/UtilitiesContext.jsx";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import DisplayError from "../../../components/DisplayError.jsx";

export default function Preferences() {
  const Navigate = useNavigate();
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page } = useOutletContext();

  const tops = [1, 2, 3];

  const state = form.validationState?.organization?.preferences;

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    form.updateField({
      path: `organization.preferences.${id}.${name}`,
      value,
      type: "text",
    });
    form.dispatch({
      type: "CHANGE",
      path: `organization.preferences.${id}.${name}`,
      result: validationUtils.handleState(name, value, "organization"), 
    });
  };

  return (
    <div className="form">
      <Header page={page} title={"Organization-related | Preferences"} />

      <div className="space-y-2 rounded-lg border border-gray-300 p-5">
        <h3 className="text-lg font-medium">2526 UP ACM Committee Primer</h3>
        <p className="text-sm text-gray-600">
          Check out the Committee Primer to learn more about each committee.
          <a href="/" className="ml-1 text-blue-600 hover:underline">
            See primer here
          </a>
        </p>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Committee Preference</h3>

        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-400">
          Insert Drag and Drop here
        </div>

        {tops.map((top) => (
          <div key={top} className="form-section">
            <h4 className="section-title">Top {top} Preferred Committee</h4>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Reason for preference
              </label>
              <textarea
                className={validationUtils.onBorderError(
                  "reason",
                  state?.[`top${top}`],
                )}
                name="reason"
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={
                  localStorage?.organization?.preferences[`top${top}`]
                    ?.reason || ""
                }
                onChange={handleChange}
                required
              />
              <DisplayError
                id="reason"
                state={state?.[`top${top}`]}
                State={validationUtils.State}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                What you expect from this committee
              </label>
              <textarea
                name="expectation"
                className={validationUtils.onBorderError(
                  "expectation",
                  state?.[`top${top}`],
                )}
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={
                  localStorage?.organization?.preferences[`top${top}`]
                    ?.expectation || ""
                }
                onChange={handleChange}
                required
              />
              <DisplayError
                id="expectation"
                state={state?.[`top${top}`]}
                State={validationUtils.State}
              />
            </div>
          </div>
        ))}
      </div>

      <Footer
        validateForm={validationUtils.validateForm}
        clearLocalStorage={clearLocalStorage}
        Navigate={Navigate}
        details={[form, "organization.preferences"]}
        nextPage="organization-related/events"
      />
    </div>
  );
}
