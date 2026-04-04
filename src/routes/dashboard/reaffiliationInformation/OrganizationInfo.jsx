import Field from "../../../components/Field.jsx";

export default function OrganizationData({ form }) {
  let organization = form?.organization;

  const isField = (obj) => {
    return obj && typeof obj === "object" && obj.type;
  };

  const renderFields = (data, values, parentKey = "") => {
    if (!data || typeof data !== "object") return null;

    return Object.keys(data).map((key, idx) => {
      const item = data[key];
      const value = values?.[key];

      if (isField(item)) {
        // checkbox (array)
        if (item.type === "checkbox") {
          return (
            <Field
              key={`${parentKey}-${key}-${idx}`}
              flex="row"
              label={item.label || item.title}
            >
              {value?.value?.length > 0 ? (
                value.value.map((val, i) => <p key={i}>{val}</p>)
              ) : (
                <p>-</p>
              )}
            </Field>
          );
        }

        // normal field
        return (
          <Field
            key={`${parentKey}-${key}-${idx}`}
            flex="row"
            label={item.label || item.title}
          >
            <p>{value?.value || "-"}</p>
          </Field>
        );
      }

      if (typeof item === "object") {
        return (
          <div key={`${parentKey}-${key}-${idx}`} className="ml-2">
            {/* section title if exists */}
            {item?.title && (
              <h2 className="font-medium mt-2">{item.title}</h2>
            )}

            {renderFields(item, value, key)}
          </div>
        );
      }

      return null;
    });
  };

  // 🔥 guard (prevents crash on undefined)
  if (!organization) {
    return (
      <div className="form">
        <h1 className="font-semibold">Organization</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Organization</h1>
      </div>

      <section className="form-section">
        {renderFields(organization, organization)}
      </section>
    </div>
  );
}