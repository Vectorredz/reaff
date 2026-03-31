import Field from "../../../components/Field.jsx";
import { UserDB } from "../../../contexts/DatabaseContext.jsx";
import useMemberForm from "../../../hooks/useMemberForm.jsx";

export default function ContactInfo({ form, user }) {

  let contacts = {
    phone: "Mobile Phone",
    telephone: "Telephone",
    primary_email: "Primary Email Address",
    up_email: "UP Email Address",
  };

  const [memberForm, updateMemberForm] = useMemberForm(form, user);

  return (
    <div className="form">
      {Object.keys(contacts).map((contact, index) => (
        <Field flex="row" key={index} label={contacts[contact]}>
          <input
            id={contact}
            value={memberForm?.[contact] ?? form?.[contact] ?? ""}
            onChange={(e) => updateMemberForm(e)}
          ></input>
        </Field>
      ))}
    </div>
  );
}
