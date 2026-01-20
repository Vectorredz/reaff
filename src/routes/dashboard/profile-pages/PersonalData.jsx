import Field from "../../../components/Field.jsx";

export default function PersonalData({ form }) {
  const member = form?.data[0];
  console.log(member);
  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Personal Data</h1>
      </div>
      <section className="form-section ">
        <p>{member?.firstName}</p>
        <Field flex="row" label="Full Name:">
          <p>{`${member?.last_name?.toUpperCase()}, ${member?.first_name?.toUpperCase()}, ${member?.middle_name?.toUpperCase()}`}</p>
        </Field>
        <Field flex="row" label="Gender:">
          <p>{`${member?.gender}`}</p>
        </Field>
        <Field flex="row" label="Birthday:">
          <p>{`${member?.birthday}`}</p>
        </Field>
        <Field flex="row" label="Address:">
          <p>{`${member?.currentAddress}`}</p>
        </Field>
        <Field flex="row" label="Student Number:">
          <p>{member?.student_number}</p>
        </Field>
        <Field flex="row" label="Degree Program:">
          <p>{`${member?.degree_program}`}</p>
        </Field>
        <Field flex="row" label="College:">
          <p>{`${member?.college}`}</p>
        </Field>
        <Field flex="row" label="Year:">
          <p>{`${member?.year}`}</p>
        </Field>
        <Field flex="row" label="Sablay:">
          <p>{`${member?.expected_grad_year}`}</p>
        </Field>
      </section>
    </div>
  );
}
