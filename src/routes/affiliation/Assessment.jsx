import "../../styles/components.css";
import { useOutletContext, useNavigate } from "react-router";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import { useEffect } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import contents from "../../data/contents.json";
import DisplayError from "../../components/DisplayError.jsx";
import { UserContext } from "../../contexts/FormContext.jsx";
const sa = contents.assessment;

export default function Assessment() {
  const { validationUtils } = UtilsDB();
  const { page, setPage } = useOutletContext();
  const { form, localStorage, clearLocalStorage } = UserContext();
  
  const Navigate = useNavigate();
  const state = form?.validationState.assessment;

  

  useEffect(() => {
    setPage(3);
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(form?.values.assessment);
  }, [form?.values]);

  const allError = (item) =>
    Object.keys(form?.values?.assessment?.[item])
      .filter((key) => key !== "meta")
      .map((key) => form?.validationState.assessment?.[item]?.[key]?.status)
      .every((status) => status === "ERROR");

  const allValid = (item) =>
    Object.keys(form?.values?.assessment?.[item])
      .filter((key) => key !== "meta")
      .map((key) => form?.validationState.assessment?.[item]?.[key]?.status)
      .every((status) => status === "VALID");

  const forceStateUpdate = (key) => {
    if (
      allError(key) &&
      state?.[key]?.meta?.status != validationUtils.State.ERROR
    ) {
      form?.dispatch({
        type: "FORCE",
        path: `assessment.${[key]}.meta`,
        result: {
          status: validationUtils.State.ERROR,
          error: "This field is required.",
        },
      });
    } else if (
      allValid(key) &&
      state?.[key]?.meta?.status != validationUtils.State.VALID
    ) {
      form?.dispatch({
        type: "FORCE",
        path: `assessment.${[key]}.meta`,
        result: {
          status: validationUtils.State.VALID,
          error: "This field is required.",
        },
      });
    }
  };

  const handleRating = (section, id, value) => {
    form?.updateField({
      path: `assessment.${section}.${id}`,
      value,
      type: "text",
    });
    form?.dispatch({
      type: "CHANGE",
      path: `assessment.${section}.${id}`,
      result: {
        status: validationUtils.State.VALID,
        error: "This field is required.",
      },
    });
  };

  const handleChange = (e, path) => {
    const { value, type, id } = e.target;
    form?.updateField({
      path: `assessment.${path}`,
      value: value,
      id: id,
      type: type,
    });
    form?.dispatch({
      type: "CHANGE",
      path: `assessment.${path}`,
      result: {
        status: validationUtils.State.VALID,
        error: "This field is required.",
      },
    });
  };

  const handleCheckbox = (id) => {
    form?.updateField({
      path: `assessment.projects`,
      value: id,
      type: "checkbox",
    });
    form?.dispatch({
      type: "CHANGE",
      path: `assessment.projects`,
      result: {
        status: validationUtils.State.VALID,
        error: "This field is required.",
      },
    });
  };

  useEffect(() => {
    console.log(form?.validationState.assessment);
    forceStateUpdate("activePerformance");
    forceStateUpdate("projectPerformance");
  }, [form?.validationState.assessment]);

  const RatingTable = ({ items, section, scaleLabels }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className=" py-2 pr-4 subheading font-medium w-full"></th>
            {scaleLabels.map((s) => (
              <th
                key={s}
                className="text-center py-2 px-3 text-gray-500 font-medium min-w-[48px]"
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 pr-4 text-gray-700">{item.label}</td>
              {scaleLabels.map((s) => (
                <td key={s} className="text-center py-3 px-3">
                  <input
                    type="radio"
                    name={`${section}-${item.id}`}
                    value={s}
                    checked={
                      localStorage?.assessment?.[section]?.[item.id]?.value === s
                    }
                    onChange={() => handleRating(section, item.id, s)}
                    className="accent-blue-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="form-frame">
      <div className="form">
        <Header page={page} title={sa.title} />

        {/* COMMITTEE ASSESSMENT */}
        <section className="form-section">
          <h2 className="section-title">{sa.committeeAssessment.title}</h2>
          <div className="question-grid">
            {sa.committeeAssessment.fields.map((field) => (
              <div
                key={field.id}
                className={`space-y-2 ${field.type === "textarea" ? "col-span-2" : ""}`}
              >
                <p className="question-text">{field.question}</p>
                {field.description && (
                  <p className="description-text">{field.description}</p>
                )}
                {field.type === "textarea" ? (
                  <textarea
                    className={validationUtils.onBorderError(
                      field.id,
                      state?.committee,
                    )}
                    value={
                      localStorage?.assessment?.committee?.[field.id]?.value || ""
                    }
                    onChange={(e) => handleChange(e, `committee.${field.id}`)}
                    placeholder="Your answer..."
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    type="select"
                    className={validationUtils.onBorderError(
                      field.id,
                      state?.committee,
                    )}
                    value={
                      localStorage?.assessment?.committee?.[field.id]?.value || ""
                    }
                    onChange={(e) => handleChange(e, `committee.${field.id}`)}
                  >
                    <option value="" disabled>
                      Select your answer
                    </option>
                    {field?.options.map((opt) => (
                      <option key={opt.id}>{opt.title}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className={validationUtils.onBorderError(
                      field.id,
                      state?.committee,
                    )}
                    value={
                      localStorage?.assessment?.committee?.[field.id]?.value || ""
                    }
                    onChange={(e) => handleChange(e, `committee.${field.id}`)}
                    placeholder="Your answer..."
                  />
                )}
                <DisplayError
                  id={field.id}
                  state={state?.committee}
                  State={validationUtils.State}
                ></DisplayError>
              </div>
            ))}
          </div>
        </section>

        {/* COMMITTEE EVALUATION */}
        <section className="form-section">
          <h2 className="section-title">{sa.committeeEvaluation.title}</h2>
          <p className="description-text">
            {sa.committeeEvaluation.description}
          </p>

          <div className="question-card space-y-4">
            <p className="question-text">
              {sa.committeeEvaluation.ratings.title}
            </p>
            <p className="notes-text">
              {sa.committeeEvaluation.ratings.description}
            </p>
            <RatingTable
              items={sa.committeeEvaluation.ratings.items}
              section="activePerformance"
              scaleLabels={sa.committeeEvaluation.ratings.scale}
            />

            <DisplayError
              id={"meta"}
              state={state?.activePerformance}
              State={validationUtils.State}
            ></DisplayError>
          </div>

          <p className="question-text">
            {sa.committeeEvaluation.elaboration.question}
          </p>
          <textarea
            className={validationUtils.onBorderError("elaboration", state)}
            value={localStorage?.assessment?.elaboration?.value || ""}
            onChange={(e) => handleChange(e, "elaboration")}
            placeholder="Feel free to elaborate..."
          />
          <DisplayError
            id={"elaboration"}
            state={state}
            State={validationUtils.State}
          ></DisplayError>
        </section>

        {/* PROJECT EVALUATION */}
        <section className="form-section">
          <h2 className="section-title">{sa.projectPerformance.title}</h2>
          <p className="description-text">
            {sa.projectPerformance.description}
          </p>

          <p className="question-text">
            {sa.projectPerformance.projects.question}
          </p>
          <div className="flex flex-wrap gap-2">
            {sa.projectPerformance.projects.options.map((opt) => (
              <label
                key={opt.id}
                className={
                  localStorage?.assessment?.projects?.value?.includes(opt.id)
                    ? "radio-label-selected"
                    : "radio-label"
                }
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={
                    localStorage?.assessment?.projects?.value?.includes(opt.id) ||
                    false
                  }
                  onChange={() => handleCheckbox(opt.id)}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          <DisplayError
            id={"projects"}
            state={state}
            State={validationUtils.State}
          ></DisplayError>

          <div className="question-card space-y-4">
            <p className="question-text">
              {sa.projectPerformance.ratings.title}
            </p>
            <p className="notes-text">
              {sa.projectPerformance.ratings.description}
            </p>
            <RatingTable
              items={sa.projectPerformance.ratings.items}
              section="projectPerformance"
              scaleLabels={sa.projectPerformance.ratings.scale}
            />
            <DisplayError
              id={"meta"}
              state={state?.projectPerformance}
              State={validationUtils.State}
            ></DisplayError>
          </div>
        </section>

        {/* ORG ASSESSMENT */}
        <section className="form-section">
          <h2 className="section-title">{sa.orgAssessment.title}</h2>
          <div className="question-grid">
            {sa.orgAssessment.fields.map((field) => (
              <div key={field.id} className="col-span-2 space-y-2">
                <p className="question-text">{field.question}</p>
                {field.description && (
                  <p className="description-text">{field.description}</p>
                )}
                <textarea
                  className={validationUtils.onBorderError(field.id, state)}
                  value={localStorage?.assessment?.[field.id]?.value || ""}
                  onChange={(e) => handleChange(e, field.id)}
                  placeholder="Your answer..."
                />
                <DisplayError
                  id={field.id}
                  state={state}
                  State={validationUtils.State}
                ></DisplayError>
              </div>
            ))}
          </div>
        </section>

        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          details={[form, "assessment"]}
          nextPage="organization-related"
          prevPage={"commitments"}
        />
      </div>
    </div>
  );
}
