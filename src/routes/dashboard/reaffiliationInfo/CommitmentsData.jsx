import Field from "../../../components/Field.jsx";

export default function CommitmentsData({ form }) {
  let commitments = form?.commitments
  let commitmentsData = {
    up: "UP Organization",
    non_up: "Non-UP Organization",
    priorities: "Priorities",
    concerns: {
      acad: "Academic Concerns",
      health: "Health Concerns",
      personal: "Personal Concerns",
      other: "Other Concerns",
    }
  }
  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Commitments</h1>
      </div>
      <section className="form-section ">
        <Field flex="row" label="UP Organization:">
          {commitments?.up.map((org) => {
            return <p>{org}</p>;
          })}
        </Field>
        <Field flex="row" label="NON-UP Organization:">
          {commitments?.up.map((org) => {
            return <p>{org}</p>;
          })}
        </Field>
        <Field flex="row" label="Priorities:">
          <p>{`${commitments?.prioritiesl}`}</p>
        </Field>
        <Field flex="row" label="Concerns:">
        </Field>
      </section>
    </div>
  );
}
