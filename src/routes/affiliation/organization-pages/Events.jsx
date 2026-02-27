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
  const { form, localStorage, clearLocalStorage, page } = useOutletContext();

  const state = form.validationState?.organization?.events;

  useEffect(() => {
    console.log('state',state);
  }, [state]);

  useEffect(() => {
    console.log('form', form.values.organization.events);
  }, [form.values]);

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // teachme fields are nested
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
      // top-level event radio fields (eap, algolympics, etc.)
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
    <div className="form">
      <div className="space-y-4">
        <Header page={page} title={"Organization-related | Events"} />
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
              {["yes", "no", "maybe"].map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    name={interest.id}
                    id={option}
                    onChange={handleChange}
                    checked={
                      localStorage?.organization?.events[interest.id] === option
                    }
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
              <DisplayError
                id={interest.id}
                state={state}
                State={validationUtils.State}
              />
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
            <DisplayError
              id="teachme"
              state={state}
              State={validationUtils.State}
            />
          </div>

          <p>
            What topics would you be enthusiastic to personally teach for a
            teachme session?
          </p>
          <div>
            <input
              type="text"
              className={"text-field"}
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

          <p>What topics do you want to see for future teachme sessions?</p>
          <div>
            <input
              type="text"
              className={"text-field"}
              name="future"
              onChange={handleChange}
              value={localStorage?.organization?.events?.teachme?.future || ""}
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
          Navigate={Navigate}
          details={[form, "organization.events"]}
          nextPage="organization-related/committee"
        />
      </div>
    </div>
  );
}
