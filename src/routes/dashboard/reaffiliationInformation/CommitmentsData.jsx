import Field from "../../../components/Field.jsx";

export default function CommitmentsData({ form }) {
  let commitments = form?.commitments;
  let commitmentsData = {
    up: "UP Organization",
    nonup: "Non-UP Organization",
    priorities: "Priorities",
    concerns: {
      acad: "Academic Concerns",
      health: "Health Concerns",
      personal: "Personal Concerns",
      other: "Other Concerns",
    },
  };
  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Commitments</h1>
      </div>

      <section className="form-section">
        {Object.keys(commitmentsData)?.map((item, idx) =>
          item === "up" || item == "nonup" ? (
            <Field keys={idx} flex="row" label={commitmentsData[item]}>
              {commitments?.[item]?.value?.map((org, orgIdx) => {
                return <p key={orgIdx}>{`${org}`}</p>;
              })}
            </Field>
          ) : item === "concerns" ? (
            Object.keys(commitmentsData.concerns).map((concern, concernIdx) => {
              return (
                <Field
                  keys={concernIdx}
                  flex="row"
                  label={commitmentsData.concerns[concern]}
                >
                  <p>{commitmentsData.concerns?.[concern]?.value}</p>
                </Field>
              );
            })
          ) : (
            <Field keys={idx} flex="row" label={commitmentsData[item]}>
              <p>{commitments?.[item]?.value}</p>
            </Field>
          ),
        )}
      </section>
    </div>
  );
}
