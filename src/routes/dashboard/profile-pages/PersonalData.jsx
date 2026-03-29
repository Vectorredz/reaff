import Field from "../../../components/Field.jsx";

export default function PersonalData({ form }) {
  return (
    <div className="form space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Personal Data
        </h1>
        <p className="text-sm text-gray-500">
          Review the personal information retrieved from your formship record.
        </p>
      </div>

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

          <Field flex="row" label="Gender">
            <p className="field-text">{form?.gender}</p>
          </Field>

          <Field flex="row" label="Birthday">
            <p className="field-text">{form?.birthday}</p>
          </Field>

          <Field flex="row" label="Student Number">
            <p className="field-text">{form?.student_number}</p>
          </Field>

          <Field flex="row" label="Degree Program">
            <p className="field-text">{form?.degree_program}</p>
          </Field>

          <Field flex="row" label="College">
            <p className="field-text">{form?.college}</p>
          </Field>

          <Field flex="row" label="Year Level">
            <p className="field-text">{form?.year}</p>
          </Field>

          <Field flex="row" label="Expected Sablay">
            <p className="field-text">{form?.expected_grad_year}</p>
          </Field>

        </div>

        {/* Address full width */}
        <div className="pt-4 border-t border-gray-200">
          <Field flex="col" label="Current Address">
            <span className="field-text">
              {form?.current_address}
            </span>
          </Field>
        </div>

      </section>
    </div>
  );
}