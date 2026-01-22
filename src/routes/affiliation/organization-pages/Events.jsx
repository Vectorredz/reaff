import { useNavigate } from "react-router";
import contents from "../../../data/contents.json";

export default function Events() {
  const Navigate = useNavigate();
  return (
    <div className="form">
      {/* Intro */}
      <div className="space-y-4">
        <p>{contents.events_page.preface}</p>

        <ol className="list-decimal pl-6 space-y-2">
          {contents.events_page.events.map((event) => (
            <li>
              <p>
                <strong>{event.title}</strong> - {event.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {contents.events_page.interests.map((interest) => (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{interest.question}</h2>
            <p>{interest.description}</p>
            <div className="flex flex-col gap-2">
              <div>
                <input type="radio" name={interest.code} id="yes" />
                <label htmlFor="yes">yes</label>
              </div>
              <div>
                <input type="radio" name={interest.code} id="no" />
                <label htmlFor="no">no</label>
              </div>
              <div>
                <input type="radio" name={interest.code} id="maybe" />
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
            {contents.events_page.teachMe.choices.map((choice) => (
              <div>
                <input type="checkbox" name="teachme" id={choice.code} />
                <label htmlFor={choice.code}>{choice.name}</label>
              </div>
            ))}
          </div>
         
          <p>
            What topics would you be enthusiastic to personally teach for a
            teAChMe session?
          </p>
          <input type="text" className="text-field" id="" />

          <p>What topics do you want to see for future teAChMe sessions?</p>
          <input type="text" className="text-field" id="" />
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
