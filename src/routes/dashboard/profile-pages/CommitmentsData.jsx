import Field from "../../../components/Field.jsx";

export default function CommitmentsData({ form }) {
  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Commitments</h1>
      </div>
      <section className="form-section ">
        <Field flex="row" label="UP Organization:">
          {form?.up.map((org) => {
            return <p>{org}</p>;
          })}
        </Field>
        <Field flex="row" label="NON-UP Organization:">
          {form?.up.map((org) => {
            return <p>{org}</p>;
          })}
        </Field>
        <Field flex="row" label="Priorities:">
          <p>{`${form?.prioritiesl}`}</p>
        </Field>
        <Field flex="row" label="Concerns:">
        </Field>
      </section>
    </div>
  );
}
