import { useOutletContext, useNavigate } from "react-router";
import Header from "../../../components/Header.jsx";
import contents from "../../../data/contents.json";
import { UtilsDB } from "../../../contexts/UtilitiesContext";
import Footer from "../../../components/Footer.jsx";
import { useEffect } from "react";
import DisplayError from "../../../components/DisplayError.jsx";
import Field from "../../../components/Field.jsx";

export default function Concerns() {
  const Navigate = useNavigate();
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page, files, setFiles } =
    useOutletContext();

  const state = form.validationState?.organization?.committee;

  useEffect(() => {
    console.log("state", form.values.organization.committee);
  }, [form])

  const handleChange = (e, committee) => {
    const { name, id, type, value } = e.target;
    if (type === "file") {
      const file = e.target.files?.[0];
      if (!file) return;
      setFiles((prev) => ({
        ...prev,
        [name]: { ...prev[name], file, id: name },
      }));
      return;
    }

    const isFacetoface = name === "facetoface" || name === "comment";
    const path = isFacetoface
      ? `organization.committee.${committee}.facetoface.${name === "facetoface" ? "answer" : "comment"}`
      : `organization.committee.${committee}.${name}`;

    form.updateField({ path, value: type === "radio" || type === "checkbox" ? id : value, id, type });
    form.dispatch({
      type: "CHANGE",
      path,
      result: validationUtils.handleState(
        name,
        type === "radio" || type === "checkbox" ? id : value,
        "organization",
      ),
    });
  };

  return (
    <div className="form">
      <Header
        page={page}
        title={"Organization-related | Committee-specific Concerns"}
      />

      {Object.keys(contents.organization_related.committee_concerns_pages).map(
        (committee) => (
          <section key={committee} className="form-section">
            <h2 className="section-title capitalize">
              {committee}-specific Concerns
            </h2>

            <div className="space-y-6">
              {contents.organization_related.committee_concerns_pages[
                committee
              ].map((item, key) => (
                <div key={key} className="space-y-2">
                  {item?.question && (
                    <p className="question-text">
                      {item.question}
                    </p>
                  )}
                  {item?.description && (
                    <p className="description-text">{item.description}</p>
                  )}

                  {/* FACETOFACE */}
                  {item?.id === "facetoface" ? (
                    <div className="space-y-3">
                      <div className="radio-section flex-col">
                        {item.answer.options.map((option, index) => (
                          <label key={index} className="radio-label">
                            <input
                              type="radio"
                              name={option.name}
                              id={option.id}
                              value={option.id}
                              onChange={(e) => handleChange(e, committee)}
                              checked={
                                localStorage?.organization?.committee?.[
                                  committee
                                ]?.facetoface?.answer === option.id
                              }
                            />
                            <span className="text-sm">{option.title}</span>
                          </label>
                        ))}
                        <DisplayError
                          id="answer"
                          state={state?.[committee]?.facetoface}
                          State={validationUtils.State}
                        />
                      </div>
                      <Field label={item.comments.placeholder}>
                        <input
                          type="text"
                          className={validationUtils.onBorderError(
                            "comment",
                            state?.[committee]?.facetoface,
                          )}
                          name="comment"
                          placeholder={item.comments.placeholder}
                          value={
                            localStorage?.organization?.committee?.[committee]
                              ?.facetoface?.comment || ""
                          }
                          onChange={(e) => handleChange(e, committee)}
                        />
                        <DisplayError
                          id="comment"
                          state={state?.[committee]?.facetoface}
                          State={validationUtils.State}
                        />
                      </Field>
                    </div>
                  ) : item?.type === "text" ? (
                    <Field label="">
                      <input
                        type="text"
                        className={validationUtils.onBorderError(
                          item.id,
                          state?.[committee],
                        )}
                        placeholder={item.placeholder || ""}
                        name={item.id}
                        value={
                          localStorage?.organization?.committee?.[committee]?.[
                            item.id
                          ] || ""
                        }
                        onChange={(e) => handleChange(e, committee)}
                      />
                      <DisplayError
                        id={item.id}
                        state={state?.[committee]}
                        State={validationUtils.State}
                      />
                    </Field>
                  ) : item?.type === "file" ? (
                    <div className="flex flex-col gap-1">
                      {item.notes && (
                        <p className="notes-text">{item.notes}</p>
                      )}
                      <input
                        type="file"
                        name={item.id}
                        onChange={(e) => handleChange(e, committee)}
                        className="file-input"
                      />
                      <DisplayError
                        id={item.id}
                        state={state?.[committee]}
                        State={validationUtils.State}
                      />
                    </div>
                  ) : item?.type === "radio" ? (
                    <div className="space-y-2">
                      <div className="radio-section flex-col">
                        {item.options.map((option, index) => (
                          <label key={index} className="radio-label">
                            <input
                              type="radio"
                              name={option.name}
                              id={option.id}
                              onChange={(e) => handleChange(e, committee)}
                              checked={
                                localStorage?.organization?.committee?.[
                                  committee
                                ]?.[option.name] === option.id
                              }
                            />
                            <span className="text-sm">{option.title}</span>
                          </label>
                        ))}
                      </div>
                      <DisplayError
                        id={item.id}
                        state={state?.[committee]}
                        State={validationUtils.State}
                      />
                    </div>
                  ) : item?.type === "checkbox" ? (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2">
                        {item.options.map((option, index) => (
                          <label key={index} className="radio-label">
                            <input
                              type="checkbox"
                              name={item.id}
                              id={option.id}
                              onChange={(e) => handleChange(e, committee)}
                              checked={localStorage?.organization?.committee?.[
                                committee
                              ]?.[item.id]?.includes(option.id)}
                            />
                            <span className="text-sm">{option.title}</span>
                          </label>
                        ))}
                      </div>
                      <DisplayError
                        id={item.id}
                        state={state?.[committee]}
                        State={validationUtils.State}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ),
      )}

      <Footer
        validateForm={validationUtils.validateForm}
        clearLocalStorage={clearLocalStorage}
        Navigate={Navigate}
        details={[form, "organization.committee"]}
        nextPage="/create-account"
      />
    </div>
  );
}
