import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useReducer } from "react";
import { UtilsDB } from "../../../contexts/UtilitiesContext.jsx";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import DisplayError from "../../../components/DisplayError.jsx";

export default function Preferences() {
  const Navigate = useNavigate();
  const { decoderMap, State } = UtilsDB();
  const {
    formData,
    setFormData,
    localStorage,
    setLocalStorage,
    clearLocalStorage,
    page,
  } = useOutletContext();
  const tops = [1, 2, 3];

  // ERROR AND STATE HANDLING

  const handleState = (key, id) => {
    let value = formData?.organization?.preferences[id][key];
    let item = decoderMap?.organization.preferences[id][key];
    if (!value) {
      return { status: State.EMPTY, error: "This field is required." };
    } else if (item.pattern && !item.pattern.test(value)) {
      return { status: State.ERROR, error: item.error };
    } else {
      return { status: State.VALID, error: "" };
    }
  };

  function validationReducer(state, action) {
    const { type, name, id } = action;
    switch (type) {
      case "CHANGE":
        console.log(name, id);
        return {
          ...state,
          [id]: {
            ...state[id],
            [name]: {
              ...state[id][name],
              status: handleState(name, id).status,
              error: handleState(name, id).error,
            },
          },
        };
      case "SUBMIT":
        const newState = {}
        for (const [prefKeys, fields] of Object.entries(state)) {
          newState[prefKeys] = {}
          for (const [fieldsKey, fieldsVal] of Object.entries(fields)) {
            if (
              fieldsVal.status === State.VALID ||
              fieldsVal.status === State.SUCCESS
            ) {
              newState[prefKeys][fieldsKey] = { status: State.SUCCESS, error: "" };
            } else {
              newState[prefKeys][fieldsKey] = {
                status: State.ERROR,
                error: "This field is required.",
              };
            }
          }
        }
        console.log(newState);
        return newState;
    }
  }

  const onBorderError = (id, name) =>
    state[id][name].status === State.ERROR
      ? "text-field border-red-500"
      : "text-field";

  const initialValidationState = () => {
    const pref = formData.organization.preferences;
    let result = {};
    for (const [prefKeys, fields] of Object.entries(pref)) {
      if (prefKeys === "committeeRank") continue;
      result[prefKeys] = {};
      for (const [fieldKey, fieldVal] of Object.entries(fields)) {
        result[prefKeys][fieldKey] = {
          status: fieldVal ? State.VALID : State.EMPTY,
          error: "",
        };
      }
    }
    return result;
  };

  const [state, dispatch] = useReducer(
    validationReducer,
    initialValidationState(),
  );

  const validateForm = () => {
    let complete = true;
    for (const [prefKeys, fields] of Object.entries(
      decoderMap.organization.preferences,
    )) {
      if (prefKeys === "committeeRankings") continue;
      for (const [fieldKeys, fieldVals] of Object.entries(fields)) {
        if (fieldVals.required) {
          complete &&=
            state[prefKeys][fieldKeys].status === State.VALID ||
            state[prefKeys][fieldKeys].status === State.SUCCESS;
        }
      }
    }
    dispatch({ type: "SUBMIT" });
    return complete;
  };

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  // FORM UPDATER

  const updateReasons = (prev = formData, value, id, name) => {
    return {
      ...prev,
      organization: {
        ...prev?.organization,
        preferences: {
          ...prev?.organization?.preferences,
          [id]: {
            ...prev?.organization?.preferences[id],
            [name]: value,
          },
        },
      },
    };
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setFormData((prev) => updateReasons(prev, value, id, name));
    setLocalStorage((prev) => updateReasons(prev, value, id, name));
    dispatch({ type: "CHANGE", name: name, id: id });
  };

  return (
    <div className="form">
      {/* Page Title */}
      <Header page={page} title={"Organization-related | Preferences"}></Header>

      {/* Primer Section */}
      <div className="space-y-2 rounded-lg border border-gray-300 p-5">
        <h3 className="text-lg font-medium">2526 UP ACM Committee Primer</h3>
        <p className="text-sm text-gray-600">
          Check out the Committee Primer to learn more about each committee.
          <a href="/" className="ml-1 text-blue-600 hover:underline">
            See primer here
          </a>
        </p>
      </div>

      {/* Preferences Section */}
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Committee Preference</h3>

        {/* Drag and Drop Placeholder */}
        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-400">
          Insert Drag and Drop here
        </div>

        {/* Top Preferences */}
        {tops.map((top) => (
          <div key={top} className="form-section">
            <h4 className="section-title">Top {top} Preferred Committee</h4>

            {/* Reason */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Reason for preference*
              </label>
              <input
                className={onBorderError(`top${top}`, "reason")}
                name="reason"
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={
                  localStorage?.organization?.preferences[`top${top}`]?.reason
                }
                onChange={handleChange}
                required
              />
              <DisplayError
                id={`top${top}`}
                name="reason"
                state={state}
                State={State}
              ></DisplayError>
            </div>

            {/* Expectation */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                What you expect from this committee
              </label>
              <input
                name="expectation"
                className={onBorderError(`top${top}`, "expectation")}
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={
                  localStorage?.organization?.preferences[`top${top}`]
                    ?.expectation
                }
                onChange={handleChange}
                required
              />
              <DisplayError
                id={`top${top}`}
                name="expectation"
                state={state}
                State={State}
              ></DisplayError>
            </div>
          </div>
        ))}
      </div>
      <Footer
        validateForm={validateForm}
        clearLocalStorage={clearLocalStorage}
        Navigate={Navigate}
        nextPage="organization-related/events"
      ></Footer>
    </div>
  );
}
