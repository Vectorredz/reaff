import { useOutletContext, useNavigate } from "react-router";
import { useState, useRef, useEffect, useReducer } from "react";
import { UtilsDB } from "../../contexts/UtilitiesContext.jsx";
import "../../styles/components.css";
import Add from "../../components/Add.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import contents from "../../data/contents.json";
import DisplayError from "../../components/DisplayError.jsx";
export default function Commitments() {
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page, setPage } =
    useOutletContext();
  const state = form.validationState?.commitments;
  const upRef = useRef(null);
  const nonUpRef = useRef(null);
  const Navigate = useNavigate();

  const handleAddOrg = (e, org, ref) => {
    e.preventDefault();
    console.log(org);
    if (ref.current.value !== "") {
      form.updateField({
        path: `commitments.${org}`,
        value: ref.current.value,
        type: "array",
      });
    }
    form.dispatch({
      type: "CHANGE",
      path: `commitments.${org}`,
      result: validationUtils.handleState(
        org,
        ref.current.value,
        "commitments",
      ),
    });
    ref.current.value = "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "addText") return;
    form.updateField({
      path: `commitments.${name}`,
      value: newValue,
      id,
      type,
    });
    form.dispatch({
      type: "CHANGE",
      path: `commitments.${name}`,
      result: validationUtils.handleState(name, newValue, "commitments"),
    });
  };

  const handleConcernChange = (e) => {
    const { name, value } = e.target;
    form.updateField({
      path: `commitments.concerns.${name}`,
      value,
      type: "text",
    });
    form.dispatch({
      type: "CHANGE",
      path: `commitments.concerns.${name}`,
      result: validationUtils.handleState(name, value, "commitments"),
    });
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="form-frame">
      <div className="form space-y-8">
        <Header page={page} title="Commitments" />

        {/* MEMBERSHIP */}
        <section className="form-section">
          <h2 className="section-title">Type of membership</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(contents.commitments.membership.options).map((key) => {
              const opt = contents.commitments.membership.options[key];
              return (
                <label
                  key={key}
                  htmlFor={opt.id}
                  className={
                    localStorage?.commitments?.membership === opt.id
                      ? "radio-label-selected"
                      : "radio-label"
                  }
                >
                  <input
                    type={opt.type}
                    name="membership"
                    id={opt.id}
                    checked={localStorage?.commitments?.membership === opt.id}
                    onChange={handleChange}
                  />
                  <span className="text-sm">{opt.title}</span>
                </label>
              );
            })}
          </div>

          <DisplayError
            id={`membership`}
            state={state}
            State={validationUtils.State}
          ></DisplayError>
        </section>

        {/* ORGANIZATIONS */}
        <section className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UP */}
            <div className="space-y-3">
              <h2 className="section-title">Organizations within UP</h2>

              <div className="flex flex-wrap gap-2 rounded-md bg-gray-50 p-3 min-h-[64px]">
                {localStorage?.commitments?.up?.length ? (
                  localStorage.commitments.up.map((org, i) => (
                    <span key={i} className="fill-button">
                      {org}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No organizations added
                  </p>
                )}
              </div>

              <Add
                handler={handleAddOrg}
                placeholder={contents.commitments.up.placeholder}
                ref={upRef}
                onChange={handleChange}
                list="up"
              />
              <DisplayError
                id={`up`}
                state={state}
                State={validationUtils.State}
              ></DisplayError>
            </div>

            {/* NON-UP */}
            <div className="space-y-3">
              <h2 className="section-title">Organizations outside UP</h2>

              <div className="flex flex-wrap gap-2 rounded-md bg-gray-50 p-3 min-h-[64px]">
                {localStorage?.commitments?.nonup?.length ? (
                  localStorage.commitments.nonup.map((org, i) => (
                    <span key={i} className="fill-button">
                      {org}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No organizations added
                  </p>
                )}
              </div>

              <Add
                handler={handleAddOrg}
                placeholder={contents.commitments.nonup.placeholder}
                ref={nonUpRef}
                onChange={handleChange}
                list="nonup"
              />
              <DisplayError
                id={`nonup`}
                state={state}
                State={validationUtils.State}
              ></DisplayError>
            </div>
          </div>
        </section>

        {/* PRIORITIES */}
        <section className="form-section">
          <h2 className="section-title">Other significant priorities</h2>
          <input
            type="text"
            name="priorities"
            value={localStorage?.commitments?.priorities || ""}
            placeholder={contents.commitments.priorities.placeholder}
            onChange={handleChange}
            className="text-field"
          />
        </section>

        {/* CONCERNS */}
        <section className="form-section">
          <h2 className="section-title">
            {contents.commitments.concerns.title}
          </h2>

          <p className="text-sm text-gray-600">
            {contents.commitments.concerns.description}
          </p>

          <div className="space-y-4">
            {Object.keys(contents.commitments.concerns.choices).map((key) => {
              const item = contents.commitments.concerns.choices[key];
              return (
                <div key={key} className="space-y-1">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <textarea
                    name={item.id}
                    value={localStorage?.commitments?.concerns[key] || ""}
                    onChange={handleConcernChange} // ← use this one
                    className="text-field min-h-[96px]"
                    placeholder="Elaborate your concern..."
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          Navigate={Navigate}
          details={[form, "commitments"]}
          nextPage={
            
            ["returningMember", "activeMember"].includes(form?.values?.commitments?.membership)
              ? "self-assessment"
              : "organization-related"
          }
        />
      </div>
    </div>
  );
}
