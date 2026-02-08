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
  const { decoderMap, State } = UtilsDB();
  const {
    formData,
    setFormData,
    localStorage,
    setLocalStorage,
    clearLocalStorage,
    page,
    setPage,
  } = useOutletContext();

  const [complete, setComplete] = useState(false);
  const upRef = useRef(null);
  const nonUpRef = useRef(null);
  const Navigate = useNavigate();

  /* ===================== VALIDATION ===================== */

  const initialValidationState = Object.fromEntries(
    Object.keys(formData?.commitments ?? {}).map((key) => [
      key,
      {
        status: formData?.commitments[key] ? State.VALID : State.EMPTY,
        error: "",
      },
    ]),
  );

  const handleState = (key, ref) => {
    let value = formData?.commitments[key];
    let item = decoderMap.commitments[key];
    if (ref === "") {
      return { status: State.ERROR, error: "Must be nonempty value." };
    } else if (ref) {
      return { status: State.VALID, error: "" };
    }

    if (!value)
      return { status: State.EMPTY, error: "This field is required." };
    if (item.pattern && !item.pattern.test(value))
      return { status: State.ERROR, error: item.error };
    return { status: State.VALID, error: "" };
  };

  function validationReducer(state, action) {
    const { type, name, ref } = action;
    switch (type) {
      case "CHANGE":
        return {
          ...state,
          [name]: {
            ...state[name],
            status: handleState(name, ref).status,
            error: handleState(name, ref).error,
          },
        };

      case "SUBMIT":
        return Object.fromEntries(
          Object.entries(state).map(([key, val]) => [
            key,
            val.status === State.VALID || val.status === State.SUCCESS
              ? { status: State.SUCCESS, error: "" }
              : { status: State.ERROR, error: handleState(key, ref)?.error },
          ]),
        );

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(
    validationReducer,
    initialValidationState,
  );

  /* ===================== UPDATE HELPERS ===================== */

  useEffect(() => {
    console.log(state);
  }, [state]);

  const updateOrgs = (prev = formData, org, ref) => {
    const commitments = prev?.commitments[org] ?? [];
    return {
      ...prev,
      commitments: {
        ...prev.commitments,
        [org]: [...commitments, ref.current.value],
      },
    };
  };

  const updateMembership = (prev, id) => ({
    ...prev,
    commitments: {
      ...prev.commitments,
      membership: id,
    },
  });

  const updatePriorities = (prev, value) => ({
    ...prev,
    commitments: {
      ...prev.commitments,
      priorities: value,
    },
  });

  const updateConcerns = (prev, name, value) => ({
    ...prev,
    commitments: {
      ...prev.commitments,
      concerns: {
        ...prev.commitments.concerns,
        [name]: value,
      },
    },
  });

  /* ===================== HANDLERS ===================== */

  const handleAddOrg = (e, org, ref) => {
    e.preventDefault();
    if (ref.current.value !== "") {
      setFormData((prev) => updateOrgs(prev, org, ref));
      setLocalStorage((prev) => updateOrgs(prev, org, ref));
    }
    dispatch({ type: "CHANGE", name: org, ref: ref?.current?.value });
    ref.current.value = "";
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "priorities") {
      setFormData((prev) => updatePriorities(prev, value));
      setLocalStorage((prev) => updatePriorities(prev, value));
    } else if (name === "membership") {
      setFormData((prev) => updateMembership(prev, id));
      setLocalStorage((prev) => updateMembership(prev, id));
    } else {
      setFormData((prev) => updateConcerns(prev, name, value));
      setLocalStorage((prev) => updateConcerns(prev, name, value));
    }

    dispatch({ type: "CHANGE", name, ref: value });
  };

  const validateForm = () => {
    dispatch({ type: "SUBMIT" });

    return Object.entries(decoderMap.commitments)
      .filter(([, v]) => v.required)
      .every(
        ([k]) =>
          state[k].status === State.VALID || state[k].status === State.SUCCESS,
      );
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="form-frame">
      <div className="form space-y-8">
        <Header page={page} title="Commitments" />

        {/* MEMBERSHIP */}
        <section className="form-section">
          <h2 className="section-title">Type of membership</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(contents.commitments.membership.options).map((key) => {
              const opt = contents.commitments.membership.options[key];
              return (
                <label
                  key={key}
                  htmlFor={opt.id}
                  className={
                    localStorage?.commitments?.membership === opt.id
                      ? "radio-label bg-gray-100"
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
            State={State}
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
                    <span
                      key={i}
                      className="rounded-full bg-accent-1/10 px-3 py-1 text-sm text-gray-400"
                    >
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
                handleChange={handleChange}
                list="up"
              />
              <DisplayError
                id={`up`}
                state={state}
                State={State}
              ></DisplayError>
            </div>

            {/* NON-UP */}
            <div className="space-y-3">
              <h2 className="section-title">Organizations outside UP</h2>

              <div className="flex flex-wrap gap-2 rounded-md bg-gray-50 p-3 min-h-[64px]">
                {localStorage?.commitments?.nonup?.length ? (
                  localStorage.commitments.nonup.map((org, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-accent-1/10 px-3 py-1 text-sm text-gray-400"
                    >
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
                list="nonup"
              />
              <DisplayError
                id={`nonup`}
                state={state}
                State={State}
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
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    className="text-field min-h-[96px]"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <Footer
          validateForm={validateForm}
          clearLocalStorage={clearLocalStorage}
          Navigate={Navigate}
          nextPage="organization-related"
        />
      </div>
    </div>
  );
}
