import Field from "../../../components/Field.jsx";

export default function ContactInfo({ form }) {
  const member = form?.data[0]
  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Contact Info</h1>
      </div>
      <section className="form-section ">
        <Field flex="row" label="Mobile Phone:">
          <p>{member?.phone}</p>
        </Field>
        <Field flex="row" label="Telephone:">
          <p>{`${member?.telephone}`}</p>
        </Field>
        <Field flex="row" label="Primary Email Address:">
          <p>{`${member?.primaryEmail}`}</p>
        </Field>
        <Field flex="row" label="UP Email Address:">
          <p>{`${member?.upEmail}`}</p>
        </Field>
      </section>
    </div>
  );
}
