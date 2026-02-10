import { useNavigate, useOutletContext } from "react-router";
import contents from "../../../data/contents.json";
import Header from "../../../components/Header.jsx";
import { useEffect, useReducer } from "react";
import Footer from "../../../components/Footer.jsx";
import { UtilsDB } from "../../../contexts/UtilitiesContext.jsx";

export default function Events() {
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

  const handleState = (key, value) => {
    let item = decoderMap.organization.events[key];
    if (!value || value.length === 0) {
      return { status: State.EMPTY, error: "This field is required." };
    } else if (item?.pattern && !item.pattern.test(value)) {
      return { status: State.ERROR, error: item.error };
    } else {
      return { status: State.VALID, error: "" };
    }
  };

  function validationReducer(state, action) {
    const { type, name, input, id, value } = action;
    let newState = {};
    switch (type) {
      case "CHANGE":
        console.log(name, name === "enthusiast");
        if (name === "enthusiast" || name === "future") {
          const result = handleState(name, value);
          return {
            ...state,
            teachme: {
              ...state?.teachme,
              [name]: {
                ...state?.teachme[name],
                status: result.status,
                error: result.error,
              },
            },
          };
        } else if (name === "choices") {
          return {
            ...state,
            teachme: {
              ...state?.teachme,
              [name]: {
                ...state?.teachme[name],
                status: handleState(name, value).status,
                error: handleState(name, value).error,
              },
            },
          };
        } else {
          return {
            ...state,
            [name]: {
              ...state[name],
              status: handleState(name, value).status,
              error: handleState(name, value).error,
            },
          };
        }

      case "SUBMIT":
        for (const [prefKeys, fields] of Object.entries(state)) {
          newState[prefKeys] = {};
          if (prefKeys === "teachme") {
            for (const [fieldsKey, _] of Object.entries(fields)) {
              console.log(fieldsKey);
              newState[prefKeys][fieldsKey] =
                state[prefKeys][fieldsKey].status === State.SUCCESS ||
                state[prefKeys][fieldsKey].status === State.VALID
                  ? {
                      status: State.SUCCESS,
                      error: handleState(prefKeys).error,
                    }
                  : { status: State.ERROR, error: handleState(prefKeys).error };
            }
          } else {
            newState[prefKeys] =
              state[prefKeys].status === State.SUCCESS ||
              state[prefKeys].status === State.VALID
                ? { status: State.SUCCESS, error: handleState(prefKeys).error }
                : { status: State.ERROR, error: handleState(prefKeys).error };
          }
        }
        return state;
    }
  }

  const initialValidationState = () => {
    let state = {};
    let events = localStorage?.organization?.events;
    for (const [prefKeys, fields] of Object.entries(events)) {
      state[prefKeys] = {};
      if (prefKeys === "teachme") {
        for (const [fieldsKey, _] of Object.entries(fields)) {
          state[prefKeys][fieldsKey] = events[prefKeys][fieldsKey]
            ? { status: State.VALID, error: "" }
            : { status: State.EMPTY, error: "" };
        }
      } else {
        state[prefKeys] = events[prefKeys]
          ? { status: State.VALID, error: "" }
          : { status: State.EMPTY, error: "" };
      }
    }
    return state;
  };

  const [state, dispatch] = useReducer(
    validationReducer,
    initialValidationState(),
  );

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const validateForm = () => {
    let complete = true;
    for (const [prefKeys, fields] of Object.entries(
      decoderMap.organization.events,
    )) {
      if (prefKeys === "teachme") {
        for (const [fieldsKey, _] of Object.entries(fields)) {
          complete &&=
            state[prefKeys][fieldsKey].status === State.VALID ||
            state[prefKeys][fieldsKey].status === State.SUCCESS
              ? true
              : false;
          console.log(fieldsKey, state[prefKeys][fieldsKey], complete);
        }
      } else {
        complete &&=
          state[prefKeys].status === State.VALID ||
          state[prefKeys].status === State.SUCCESS
            ? true
            : false;
        console.log(prefKeys, state[prefKeys], complete);
      }
    }
    dispatch({ type: "SUBMIT" });
    console.log(complete);
    return complete;
  };

  const updateInterests = (prev, name, id) => {
    return {
      ...prev,
      organization: {
        ...prev.organization,
        events: {
          ...prev.organization.events,
          [name]: id,
        },
      },
    };
  };

  const updateChoices = (prev, name, id) => {
    const eap = prev.organization.events.teachme[name];
    return {
      ...prev,
      organization: {
        ...prev?.organization,
        events: {
          ...prev?.organization?.events,
          teachme: {
            ...prev?.organization?.events?.teachme,
            [name]: eap.includes(id)
              ? eap.filter((choice) => choice !== id)
              : [...eap, id],
          },
        },
      },
    };
  };

  const updateTeachMe = (prev, name, e) => ({
    ...prev,
    organization: {
      ...prev.organization,
      events: {
        ...prev.organization.events,
        teachme: {
          ...prev.organization.events.teachme,
          [name]: e.target.value,
        },
      },
    },
  });

  const handleChange = (e) => {
    const { type, name, id, value } = e.target;
    if (name === "choices") {
      setFormData((prev) => updateChoices(prev, name, id));
      setLocalStorage((prev) => updateChoices(prev, name, id));
    } else if (name === "enthusiast" || name === "future") {
      setFormData((prev) => updateTeachMe(prev, name, e));
      setLocalStorage((prev) => updateTeachMe(prev, name, e));
    } else {
      setFormData((prev) => updateInterests(prev, name, id));
      setLocalStorage((prev) => updateInterests(prev, name, id));
    }
    dispatch({ type: "CHANGE", name, input: type, id: id, value });
  };

  useEffect(() => {
    console.log(formData.organization.events);
  }, [formData]);

  return (
    <div className="form">
      <div className="space-y-4">
        <Header page={page} title={"Organization-related | Events"}></Header>

        <p>{contents.organization_related.events_page.preface}</p>

        <ol className="list-decimal pl-6 space-y-2">
          {contents.organization_related.events_page.events.map((event) => (
            <li key={event.id}>
              <p>
                <strong>{event.title}</strong> - {event.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {contents.organization_related.events_page.interests.map((interest) => (
          <div key={interest.id} className="form-section space-y-2">
            <h2 className="text-lg font-semibold">{interest.question}</h2>
            <p>{interest.description}</p>
            <div className="flex flex-col gap-2">
              <div>
                <input
                  type="radio"
                  name={interest.id}
                  id="yes"
                  onChange={handleChange}
                  checked={
                    localStorage?.organization.events[interest.id] === "yes"
                  }
                />
                <label htmlFor="yes">yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={interest.id}
                  id="no"
                  onChange={handleChange}
                  checked={
                    localStorage?.organization.events[interest.id] === "no"
                  }
                />
                <label htmlFor="no">no</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={interest.id}
                  id="maybe"
                  onChange={handleChange}
                  checked={
                    localStorage?.organization.events[interest.id] === "maybe"
                  }
                />
                <label htmlFor="maybe">maybe</label>
              </div>
            </div>
          </div>
        ))}
        <div className="form-section">
          <h2 className="text-lg font-semibold">
            {contents.organization_related.events_page.teachme.title}
          </h2>
          <p>{contents.organization_related.events_page.teachme.question}</p>
          <p>{contents.organization_related.events_page.teachme.description}</p>
          <div>
            {contents.organization_related.events_page.teachme.choices.map(
              (choice, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="choices"
                    id={choice.name}
                    onChange={handleChange}
                    checked={localStorage?.organization?.events?.teachme?.choices?.includes(
                      choice.name,
                    )}
                  />
                  <label htmlFor={choice.name}>{choice.name}</label>
                </div>
              ),
            )}
          </div>

          <p>
            What topics would you be enthusiastic to personally teach for a
            teachme session?
          </p>
          <input
            type="text"
            className="text-field"
            name="enthusiast"
            id=""
            onChange={handleChange}
            value={
              localStorage?.organization?.events?.teachme?.enthusiast || ""
            }
          />

          <p>What topics do you want to see for future teachme sessions?</p>
          <input
            type="text"
            className="text-field"
            name="future"
            id=""
            onChange={handleChange}
            value={localStorage?.organization?.events?.teachme?.future || ""}
          />
        </div>

        <Footer
          validateForm={validateForm}
          clearLocalStorage={clearLocalStorage}
          Navigate={Navigate}
          nextPage="/organization-related/events"
        />
      </div>
    </div>
  );
}
