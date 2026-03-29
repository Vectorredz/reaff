import { useNavigate, useOutletContext } from "react-router";
import contents from "../../../data/contents.json";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import { UtilsDB } from "../../../contexts/UtilitiesContext.jsx";
import DisplayError from "../../../components/DisplayError.jsx";
import { useEffect } from "react";

export default function Events() {
  const Navigate = useNavigate();
  const { validationUtils } = UtilsDB();
  const { form, localStorage, clearLocalStorage, page, setPage } = useOutletContext();

  const state = form.validationState?.organization?.events;

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  useEffect(() => {
    setPage(4);
  }, []);

  useEffect(() => {
    console.log("form", form.values.organization.events);
  }, [form.values]);

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "choices") {
      form.updateField({
        path: `organization.events.teachme.choices`,
        value: id,
        type: "checkbox",
      });
      form.dispatch({
        type: "CHANGE",
        path: `organization.events.teachme.choices`,
        result: validationUtils.handleState("choices", id, "organization"),
      });
    } else if (name === "enthusiast" || name === "future") {
      form.updateField({
        path: `organization.events.teachme.${name}`,
        value: newValue,
        type,
      });
      form.dispatch({
        type: "CHANGE",
        path: `organization.events.teachme.${name}`,
        result: validationUtils.handleState(name, newValue, "organization"),
      });
    } else {
      console.log('newval', name, newValue, value)
      form.updateField({
        path: `organization.events.${name}`,
        value: newValue,
        id,
        type,
      });
      form.dispatch({
        type: "CHANGE",
        path: `organization.events.${name}`,
        result: validationUtils.handleState(name, newValue, "organization"),
      });
    }
  };

  return (
    <div className="form space-y-8">

      <div className="space-y-4">
        <Header page={page} title={"Organization-related | Events"} />

        <p className="description-text">
          {contents.organization.eventsPage.preface}
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-600">
          {contents.organization.eventsPage.events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong> — {event.description}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6">

        {contents.organization.eventsPage.interests.map((interest) => (
          <div key={interest.id} className="form-section space-y-4">

            <div>
              <h2 className="section-title">{interest.question}</h2>
              <p className="description-text">{interest.description}</p>
            </div>

            {/* RADIO OPTIONS */}
            <div className="grid grid-cols-3 gap-3">

              {["yes", "no", "maybe"].map((option) => { 
                const selected =
                  localStorage?.organization?.events[interest.id] === `${interest.id}-${option}`;
                return (
                  <div key={option}>
                    <label
                      htmlFor={`${interest.id}-${option}`}
                      className={
                        selected
                          ? "radio-label-selected"
                          : "radio-label"
                      }
                    >
                      <input
                        type="radio"
                        name={interest.id}
                        id={`${interest.id}-${option}`}
                        value={option}
                        onChange={handleChange}
                        checked={selected}
                      />

                      <span className="capitalize">{option}</span>
                    </label>

                  </div>
                );
              })}

            </div>

            <DisplayError
              id={interest.id}
              state={state}
              State={validationUtils.State}
            />
          </div>
        ))}

        {/* TEACHME SECTION */}

        <div className="form-section space-y-5">

          <div>
            <h2 className="section-title">
              {contents.organization.eventsPage.teachme.title}
            </h2>

            <p className="question-text">
              {contents.organization.eventsPage.teachme.question}
            </p>

            <p className="description-text">
              {contents.organization.eventsPage.teachme.description}
            </p>
          </div>

          {/* CHECKBOX GRID */}

          <div className="grid grid-cols-2 gap-3">

            {contents.organization.eventsPage.teachme.choices.map(
              (choice, index) => (
                <label
                  key={index}
                  htmlFor={choice.name}
                  className="checkbox-label"
                >
                  <input
                    type="checkbox"
                    name="choices"
                    id={choice.name}
                    onChange={handleChange}
                    checked={
                      localStorage?.organization?.events?.teachme?.choices?.includes(
                        choice.name
                      )
                    }
                  />

                  <span>{choice.name}</span>
                </label>
              )
            )}

          </div>

          <DisplayError
            id="teachme"
            state={state}
            State={validationUtils.State}
          />

          {/* TEXT FIELDS */}

          <div className="space-y-2">

            <p className="question-text">
              What topics would you be enthusiastic to personally teach?
            </p>

            <input
              type="text"
              className="text-field"
              name="enthusiast"
              onChange={handleChange}
              value={
                localStorage?.organization?.events?.teachme?.enthusiast || ""
              }
            />

            <DisplayError
              name="enthusiast"
              id="enthusiast"
              state={state}
              State={validationUtils.State}
            />

          </div>

          <div className="space-y-2">

            <p className="question-text">
              What topics do you want to see in future teachme sessions?
            </p>

            <input
              type="text"
              className="text-field"
              name="future"
              onChange={handleChange}
              value={
                localStorage?.organization?.events?.teachme?.future || ""
              }
            />

            <DisplayError
              name="future"
              id="future"
              state={state}
              State={validationUtils.State}
            />

          </div>
        </div>

        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          details={[form, "organization.events"]}
          nextPage="organization-related/committee"
        />

      </div>
    </div>
  );
}