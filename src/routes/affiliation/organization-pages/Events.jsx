import { useNavigate, useOutletContext } from "react-router";
import contents from "../../../data/contents.json";
import { useEffect } from "react";

export default function Events() {
  const Navigate = useNavigate();
  const { formData, setFormData, localStorage, setLocalStorage } =
    useOutletContext();

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
    // update
    const eap = prev.organization.events.teachme[name]
    return {
      ...prev,
      organization: {
        ...prev?.organization,
        events: {
          ...prev?.organization?.events,
          teachme: {
            ...prev?.organization?.events?.teachme,
            [name]: eap.includes(id) ? eap.filter((choice) => choice !== id) : [...eap, id]
          }  
        },
      },
    };
  };

  const updateTeachMe = ((prev, name, e) => ({
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
      }))

  const handleChange = (e) => {
    const { name, id } = e.target;
    if (name === "choices") {
      console.log(e.target)
      setFormData((prev) => updateChoices(prev, name, id));
      setLocalStorage((prev) => updateChoices(prev,name,id))
    }
    else if (name === "enthusiast" || name === "future") {
      setFormData((prev) => updateTeachMe(prev, name, e));
      setLocalStorage((prev) => updateTeachMe(prev, name, e));
    } else {
      setFormData((prev) => updateInterests(prev, name, id));
      setLocalStorage((prev) => updateInterests(prev, name, id));
    }
  };

  useEffect(() => {
    console.log(formData.organization.events);
  }, [formData]);

  return (
    <div className="form">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">ACM Member Affiliation Form</h1>
          <p className="text-sm text-gray-600">
            Step 3 of 5 · Organization Related | Events
          </p>
        </div>
        <p>{contents.events_page.preface}</p>

        <ol className="list-decimal pl-6 space-y-2">
          {contents.events_page.events.map((event) => (
            <li key={event.id}>
              <p>
                <strong>{event.title}</strong> - {event.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {contents.events_page.interests.map((interest) => (
          <div key={interest.id} className="space-y-2">
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
        <div>
          <h2 className="text-lg font-semibold">
            {contents.events_page.teachMe.title}
          </h2>
          <p>{contents.events_page.teachMe.question}</p>
          <p>{contents.events_page.teachMe.description}</p>
          <div>
            {contents.events_page.teachMe.choices.map((choice, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="choices"
                  id={choice.name}
                  onChange={handleChange}
                  checked={localStorage?.organization?.events?.teachme?.choices?.includes(choice.name)}
                />
                <label htmlFor={choice.name}>{choice.name}</label>
              </div>
            ))}
          </div>

          <p>
            What topics would you be enthusiastic to personally teach for a
            teAChMe session?
          </p>
          <input 
            type="text" 
            className="text-field" 
            name="enthusiast"
            id="" 
            onChange={handleChange}
            value={localStorage?.organization?.events?.teachme?.enthusiast || ""}
            />

          <p>What topics do you want to see for future teAChMe sessions?</p>
          <input 
            type="text" 
            className="text-field" 
            name="future"
            id="" 
            onChange={handleChange}
            value={localStorage?.organization?.events?.teachme?.future || ""}
            />
        </div>

        <button
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            Navigate("/signup/organization-related/concerns");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
