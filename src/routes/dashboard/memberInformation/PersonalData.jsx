import { use } from "react";
import Field from "../../../components/Field.jsx";
import useMemberForm from "../../../hooks/useMemberForm.jsx";
export default function PersonalData({ user, form }) {
  let personal = {
    birthday: "Birthday",
    gender: "Gender",
    student_number: "Student Number",
    college: "College",
    degree_program: "Degree Program",
    year: "Year Level",
    expected_grad_year: "Expected Graduation Year",
    highschool: "High School",
    current_address: "Current Address",
  };

  const [memberForm, updateMemberForm] = useMemberForm(form, user);

  return (
    <div className="form space-y-6">
      {/* Personal Info */}
      <section className="form-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
          <Field flex="row" label="Full Name">
            <p className="field-text">
              {`${form?.last_name?.toUpperCase() || ""}, 
              ${form?.first_name?.toUpperCase() || ""} 
              ${form?.middle_name?.toUpperCase() || ""}`}
            </p>
          </Field>

          {Object.keys(personal).map((item, index) => (
            <Field flex="row" key={index} label={personal[item]}>
              <input
                id={item}
                value={memberForm?.[item] ?? form?.[item] ?? ""}
                className="field-text"
                onChange={(e) => updateMemberForm(e)}
              >
              </input>
            </Field>
          ))}
        </div>
      </section>
    </div>
  );
}
